import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, CornerDownRight } from 'lucide-react';
import api, { recordView, createItem } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './styles/BlogPost.css';

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<any | null>(null);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/public/blogs/${id}`);
                const data = res.data;
                setBlog(data);
                setLikesCount(data.likes || 0);
                
                // Fetch replies for this blog
                const repliesRes = await api.get(`/public/replies?entity_id=${id}`);
                setComments(repliesRes.data || []);
                
                if (id) recordView('blogs', id);
            } catch (err) {
                console.error("Failed to fetch blog", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}><h2>Loading article...</h2></div>;

    if (!blog) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}><h2>Blog not found.</h2><Link to="/blog" className="btn-primary" style={{marginTop:'1rem'}}>Back to Blogs</Link></div>;

    const handleLike = () => {
        if (liked) {
            setLikesCount(prev => prev - 1);
        } else {
            setLikesCount(prev => prev + 1);
        }
        setLiked(!liked);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const commentPayload = {
            entity_type: 'blog',
            entity_id: id,
            user_id: user?.id || null,
            user_name: user?.username || "Guest User",
            user_avatar: (user as any)?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
            text: commentText
        };

        try {
            const res = await createItem('replies', commentPayload);
            setComments([res.data, ...comments]);
            setCommentText("");
        } catch (err) {
            console.error("Failed to post comment", err);
            alert("Failed to post comment");
        }
    };

    return (
        <div className="blog-post-page">
            <div className="blog-post-hero" style={{ backgroundImage: `url(${blog.image_url || blog.image})` }}>
                <div className="blog-post-hero-overlay"></div>
                <div className="blog-post-hero-content">
                    <span className="blog-post-category">{typeof blog.category === 'object' ? blog.category.name : blog.category}</span>
                    <h1 className="blog-post-main-title">{blog.title}</h1>
                    <div className="blog-post-hero-meta">
                        <div className="hero-author-info">
                            <img src={blog.author_avatar || blog.authorAvatar} alt={blog.author_name || blog.author} className="hero-author-avatar" />
                            <div className="hero-author-details">
                                <span className="hero-author-name">{blog.author_name || blog.author}</span>
                                <span className="hero-author-role">{blog.author_role || blog.authorRole}</span>
                            </div>
                        </div>
                        <span>•</span>
                        <span>{new Date(blog.created_at || blog.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{blog.read_time || blog.readTime}</span>
                    </div>
                </div>
            </div>

            <div className="blog-post-container">
                <div className="blog-post-sidebar">
                    <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
                        <Heart fill={liked ? '#ef4444' : 'none'} size={28} />
                        <span className="action-count">{likesCount}</span>
                    </button>
                    
                    <button className="action-btn" onClick={() => document.getElementById('comments')?.scrollIntoView({behavior: 'smooth'})}>
                        <MessageCircle size={28} />
                        <span className="action-count">{comments.length}</span>
                    </button>
                    
                    <button className="action-btn" onClick={handleShare}>
                        <Share2 size={28} />
                    </button>
                </div>

                <div className="blog-post-content">
                    {/* Render content as paragraphs (simple markdown mock) */}
                    {blog.content.split('\n\n').map((paragraph: string, index: number) => {
                        if (paragraph.startsWith('###')) {
                            return <h3 key={index}>{paragraph.replace('###', '').trim()}</h3>;
                        }
                        if (paragraph.trim().startsWith('-')) {
                            const items = paragraph.split('\n').map((p: string) => p.replace('-', '').trim());
                            return <ul key={index}>{items.map((item: string, i: number) => <li key={i}>{item}</li>)}</ul>;
                        }
                        return <p key={index}>{paragraph}</p>;
                    })}
                    
                    {/* Comments Section */}
                    <div className="comments-section" id="comments">
                        <h3 className="comments-title">Comments ({comments.length})</h3>
                        
                        <form className="comment-form" onSubmit={handleCommentSubmit}>
                            <textarea 
                                className="comment-textarea" 
                                placeholder="What are your thoughts?"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            ></textarea>
                            <button type="submit" className="btn-primary">Post Comment</button>
                        </form>

                        <div className="comments-list">
                            {comments.map((comment) => (
                                <div key={comment.id} className="comment-item">
                                    <div className="comment-header">
                                        <img src={comment.user_avatar || comment.avatar} alt={comment.user_name || comment.user} className="comment-avatar" />
                                        <span className="comment-author">{comment.user_name || comment.user}</span>
                                        <span className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="comment-body">
                                        <p className="comment-text">{comment.text}</p>
                                        <button className="comment-reply-btn" onClick={() => alert('Reply UI mock interaction')}>Reply</button>
                                    </div>
                                    
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="comment-replies">
                                            {comment.replies.map((reply: any) => (
                                                <div key={reply.id} className="comment-item" style={{marginBottom: '1rem'}}>
                                                    <div className="comment-header">
                                                        <CornerDownRight size={16} color="var(--text-light)" />
                                                        <img src={reply.avatar} alt={reply.user} className="comment-avatar" style={{width: '28px', height: '28px'}} />
                                                        <span className="comment-author" style={{fontSize: '0.9rem'}}>{reply.user}</span>
                                                        <span className="comment-date">{reply.date}</span>
                                                    </div>
                                                    <div className="comment-body" style={{marginLeft: '44px', padding: '0.75rem'}}>
                                                        <p className="comment-text" style={{fontSize: '0.95rem'}}>{reply.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
