import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import './styles/Blog.css';

const Blog = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getBlogs();
                setBlogs(res.data);
            } catch (err) {
                console.error("Blog fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);
    return (
        <div className="blog-page">
            <div className="container">
                <div className="blog-header">
                    <h1 className="blog-title">Community Voices</h1>
                    <p className="blog-subtitle">
                        Read inspiring stories, learn about sustainability, and discover how community organizing changes the world.
                    </p>
                    <div className="blog-actions">
                        <Link to="/create-blog" className="btn-primary"> <b> Write a Blog </b> </Link>
                    </div>
                </div>

                <div className="blog-grid">
                    {loading ? (
                        <div className="empty-state">Loading stories...</div>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog.id} className="blog-card card-shadow-hover">
                                <span className="blog-category">
                                    {typeof blog.category === 'object' ? blog.category.name : blog.category}
                                </span>
                                <div className="blog-card-img-container">
                                    <img src={blog.image_url || blog.image} alt={blog.title} className="blog-card-image" />
                                </div>
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span>{new Date(blog.created_at || blog.date).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{blog.read_time || blog.readTime}</span>
                                    </div>
                                    <h3 className="blog-card-title">{blog.title}</h3>
                                    <p className="blog-card-excerpt">{blog.excerpt}</p>
                                    
                                    <div className="blog-card-footer">
                                        <div className="blog-author-info">
                                            <img src={blog.author_avatar || blog.authorAvatar} alt={blog.author_name || blog.author} className="blog-author-avatar" />
                                            <span className="blog-author-name">{blog.author_name || blog.author}</span>
                                        </div>
                                        <Link to={`/blog/${blog.id}`} className="blog-read-more">
                                            Read More &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blog;
