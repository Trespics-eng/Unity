import { useParams, Link, useNavigate } from 'react-router-dom';
import CategoryBadge from '../components/CategoryBadge';
import { MapPin, Clock, ArrowLeft, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import api, { recordView } from '../services/api';

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([{ id: 1, text: "Thank you for sharing your story! It's truly inspiring.", author: "Anonymous", date: new Date().toISOString() }]);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const res = await api.get(`/public/posts/${id}`);
                setPost(res.data);
                // Record view
                if (id) recordView('posts', id);
            } catch (err) {
                console.error("Failed to fetch post details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPostDetails();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '4rem' }}>Loading story...</div>;

    if (!post) {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <h2>Story not found</h2>
                <Link to="/explore" className="btn-primary" style={{ marginTop: '1rem' }}>Back to Explore</Link>
            </div>
        );
    }

    const formatDate = (isoString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(isoString).toLocaleDateString(undefined, options);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        
        setComments([...comments, {
            id: Date.now(),
            text: comment,
            author: "Anonymous Reader",
            date: new Date().toISOString()
        }]);
        setComment('');
    };

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Header / Hero for Post */}
            <div style={{ 
                width: '100%', 
                height: '400px', 
                position: 'relative',
                backgroundColor: 'var(--primary)'
            }}>
                {post.image && (
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                )}
                <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    width: '100%', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    padding: '4rem 1.5rem 2rem 1.5rem',
                    color: 'white'
                }}>
                    <div className="container">
                        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', cursor: 'pointer', opacity: 0.8 }} onMouseOver={(e) => e.currentTarget.style.opacity = '1'} onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}>
                            <ArrowLeft size={16} /> Back
                        </button>
                        <CategoryBadge category={post.category} />
                        <h1 style={{ fontSize: '3rem', marginTop: '1rem', marginBottom: '1rem', lineHeight: 1.2 }}>{post.title}</h1>
                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={16} /> {post.location || 'Unknown'}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={16} /> {formatDate(post.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem', maxWidth: '800px' }}>
                <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-dark)', whiteSpace: 'pre-wrap' }}>
                    {post.description}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

                {/* Comments Section */}
                <section>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Responses ({comments.length})</h3>
                    
                    <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        <input 
                            type="text" 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts..." 
                            style={{ flexGrow: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                        />
                        <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Send size={18} /> Post
                        </button>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {comments.map(c => (
                            <div key={c.id} style={{ backgroundColor: 'var(--secondary)', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'var(--primary)' }}>{c.author}</strong>
                                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{formatDate(c.date)}</span>
                                </div>
                                <p style={{ color: 'var(--text-dark)' }}>{c.text}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PostDetails;
