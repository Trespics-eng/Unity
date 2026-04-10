import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Upload, X } from 'lucide-react';
import { getCategories, createItem, uploadImage } from '../services/api';
import "./styles/CreatePost.css"

interface Category {
    id: string;
    name: string;
}

interface PostFormData {
    title: string;
    category_id: string;
    description: string;
    location: string;
    customCategory: string;
    imageFile: File | null;
    imagePreview: string | null;
    image: string;
}

interface FormErrors {
    title?: string;
    category_id?: string;
    description?: string;
    location?: string;
    customCategory?: string;
    image?: string;
    submit?: string;
}

const CreatePost = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [categories, setCategories] = useState<Category[]>([]);
    
    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        category_id: '',
        description: '',
        location: '',
        customCategory: '',
        imageFile: null,
        imagePreview: null,
        image: ''
    });

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await getCategories();
                const fetchedCategories = res.data;
                setCategories(fetchedCategories);
                
                if (fetchedCategories.length > 0) {
                    const initialCat = fetchedCategories[0];
                    setFormData(prev => ({ ...prev, category_id: initialCat.id }));
                    if (initialCat.name === 'Other') {
                        setIsOtherCategory(true);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCats();
    }, []);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isOtherCategory, setIsOtherCategory] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Handle "Other" category logic
        if (name === 'category_id') {
            const selectedCat = categories.find(cat => cat.id === value);
            if (selectedCat?.name === 'Other') {
                setIsOtherCategory(true);
            } else {
                setIsOtherCategory(false);
                setFormData(prev => ({ ...prev, customCategory: '' }));
            }
        }
        
        // Clear error for this field
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({ ...prev, image: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)' }));
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
                return;
            }
            
            const previewUrl = URL.createObjectURL(file);
            setFormData(prev => ({ 
                ...prev, 
                imageFile: file, 
                imagePreview: previewUrl,
                image: previewUrl
            }));
            setErrors(prev => ({ ...prev, image: '' }));
        }
    };

    const removeImage = () => {
        if (formData.imagePreview) {
            URL.revokeObjectURL(formData.imagePreview);
        }
        setFormData(prev => ({ 
            ...prev, 
            imageFile: null, 
            imagePreview: null,
            image: ''
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters';
        }
        
        if (!formData.description.trim()) {
            newErrors.description = 'Story description is required';
        } else if (formData.description.length < 20) {
            newErrors.description = 'Please share at least 20 characters of your story';
        }
        
        if (isOtherCategory && !formData.customCategory.trim()) {
            newErrors.customCategory = 'Please enter your custom category';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            let finalImageUrl = formData.imagePreview;
            
            // Upload image to Supabase if a file exists
            if (formData.imageFile) {
                setIsUploadingImage(true);
                const uploadData = new FormData();
                uploadData.append('image', formData.imageFile);
                const uploadRes = await uploadImage(uploadData);
                finalImageUrl = uploadRes.data.url;
                setIsUploadingImage(false);
            }

            const postPayload = {
                title: formData.title,
                category_id: formData.category_id,
                description: isOtherCategory 
                    ? `[${formData.customCategory}] ${formData.description}` 
                    : formData.description,
                location: formData.location || 'Unknown',
                image_url: finalImageUrl
            };
            
            await createItem('posts', postPayload);
            
            setIsSubmitting(false);
            setSuccess(true);
            
            setTimeout(() => {
                navigate('/explore');
            }, 2000);
        } catch (err) {
            console.error("Submission failed", err);
            setErrors(prev => ({ ...prev, submit: "Failed to publish story. Please try again." }));
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="success-container">
                <div className="success-card">
                    <div className="success-icon">
                        <CheckCircle size={64} />
                    </div>
                    <h2>Story Shared Successfully!</h2>
                    <p>Your voice matters. Your story is now live for the world to see.</p>
                    <div className="success-spinner"></div>
                    <p className="redirect-text">Redirecting to Explore...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="create-post-container">
            <div className="create-post-wrapper">
                <div className="create-post-header">
                    <h1>Share Your Story</h1>
                    <p>Your voice is powerful. Every story shared brings us closer to change.</p>
                </div>

                <form onSubmit={handleSubmit} className="create-post-form">
                    {/* Title Field */}
                    <div className="form-group">
                        <label className="form-label">
                            Title <span className="required">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Give your story a compelling title"
                            className={`form-input ${errors.title ? 'error' : ''}`}
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    {/* Category and Location Row */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Category <span className="required">*</span>
                            </label>
                            <select 
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="form-select"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Location
                            </label>
                            <input 
                                type="text" 
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., Nairobi, Kenya"
                                className="form-input"
                            />
                        </div>
                    </div>

                    {/* Custom Category Input */}
                    {isOtherCategory && (
                        <div className="form-group custom-category">
                            <label className="form-label">
                                Custom Category <span className="required">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="customCategory"
                                value={formData.customCategory}
                                onChange={handleChange}
                                placeholder="Enter your custom category (e.g., Mental Health, Economic Empowerment)"
                                className={`form-input ${errors.customCategory ? 'error' : ''}`}
                            />
                            {errors.customCategory && <span className="error-message">{errors.customCategory}</span>}
                        </div>
                    )}

                    {/* Image Upload Section */}
                    <div className="form-group">
                        <label className="form-label">
                            Upload Image
                        </label>
                        <div className="image-upload-area">
                            {!formData.imagePreview ? (
                                <div 
                                    className="upload-placeholder"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload size={48} className="upload-icon" />
                                    <p>Click to upload an image</p>
                                    <span className="upload-hint">PNG, JPG, GIF up to 5MB</span>
                                    <input 
                                        ref={fileInputRef}
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            ) : (
                                <div className="image-preview-container">
                                    <div className="image-preview">
                                        <img src={formData.imagePreview} alt="Preview" />
                                        <button 
                                            type="button" 
                                            className="remove-image-btn"
                                            onClick={removeImage}
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="change-image-btn"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Change Image
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.image && <span className="error-message">{errors.image}</span>}
                    </div>

                    {/* Story Description */}
                    <div className="form-group">
                        <label className="form-label">
                            Your Story <span className="required">*</span>
                        </label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Share your experiences, challenges, triumphs, or observations here..."
                            rows={8}
                            className={`form-textarea ${errors.description ? 'error' : ''}`}
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                        <div className="char-counter">
                            {formData.description.length} characters
                            {formData.description.length < 20 && formData.description.length > 0 && (
                                <span className="char-warning"> (Minimum 20 characters)</span>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting || isUploadingImage}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                {isUploadingImage ? 'Uploading Image...' : 'Publishing Your Story...'}
                            </>
                        ) : (
                            'Publish Story'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;