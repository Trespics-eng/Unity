import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, createUserBlog, uploadImage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './styles/CreateBlog.css';

const CreateBlog = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        category_id: '',
        image_url: '',
        imageFile: null as File | null,
        excerpt: '',
        content: '',
        author_name: user?.username || 'Anonymous Community Member'
    });

    useEffect(() => {
        const fetchCats = async () => {
            const res = await getCategories();
            setCategories(res.data);
            if (res.data.length > 0) {
                setFormData(prev => ({ ...prev, category_id: res.data[0].id }));
            }
        };
        fetchCats();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            let finalImageUrl = formData.image_url;
            
            if (formData.imageFile) {
                setIsUploading(true);
                const uploadData = new FormData();
                uploadData.append('image', formData.imageFile);
                const uploadRes = await uploadImage(uploadData);
                finalImageUrl = uploadRes.data.url;
                setIsUploading(false);
            }

            const blogPayload = {
                title: formData.title,
                category_id: formData.category_id,
                image_url: finalImageUrl,
                excerpt: formData.excerpt,
                content: formData.content,
                author_name: user?.username || formData.author_name,
                read_time: "5 min read" // default or calculated
            };

            await createUserBlog(blogPayload);
            alert('Blog post published successfully!');
            navigate('/blog');
        } catch (err) {
            console.error("Blog creation failed", err);
            alert('Failed to publish blog.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-blog-page">
            <h1 className="create-blog-title">Write a Story</h1>
            <p className="create-blog-subtitle">Share your perspective, experience, or news with the community.</p>

            <form className="create-blog-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Give your blog a catchy title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category_id">Category</label>
                    <select id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required>
                        <option value="" disabled>Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Cover Image</label>
                    <input 
                        type="file" 
                        id="image" 
                        accept="image/*"
                        onChange={handleImageChange} 
                    />
                    <div style={{ marginTop: '0.5rem' }}>
                        <span className="form-label-small">Or enter URL:</span>
                        <input 
                            type="url" 
                            name="image_url" 
                            placeholder="https://images.unsplash.com/..." 
                            value={formData.image_url} 
                            onChange={handleChange} 
                        />
                    </div>
                    <span className="form-hint">Choose a file or paste a link. {isUploading ? 'Uploading...' : ''}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="excerpt">Short Excerpt</label>
                    <textarea 
                        id="excerpt" 
                        name="excerpt" 
                        rows={3} 
                        placeholder="A brief summary of your post..." 
                        value={formData.excerpt} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea 
                        id="content" 
                        name="content" 
                        rows={10} 
                        placeholder="Write your story here... You can use '###' for headings and '-' for lists." 
                        value={formData.content} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => navigate('/blog')}>Cancel</button>
                    <button type="submit" className="btn-primary" disabled={loading || isUploading}>
                        {loading ? 'Publishing...' : 'Publish Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
