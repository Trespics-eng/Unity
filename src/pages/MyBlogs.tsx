import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBlogs, getMyStats } from '../services/api';
import './styles/MyBlogs.css';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogsRes, statsRes] = await Promise.all([
                    getMyBlogs(),
                    getMyStats()
                ]);
                setBlogs(blogsRes.data);
                setStats(statsRes.data.summary);
            } catch (err) {
                console.error("Failed to fetch my blogs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="loading-spinner">Loading your dashboard...</div>;

    return (
        <div className="dashboard-container">
            <div className="container">
                <header className="dashboard-header">
                    <div>
                        <h1>My Blog Dashboard</h1>
                        <p>Track your impact and manage your stories</p>
                    </div>
                    <Link to="/create-blog" className="btn-primary">Write New Blog</Link>
                </header>

                {stats && (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>Total Blogs</h3>
                            <p className="stat-value">{stats.totalBlogs}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Views</h3>
                            <p className="stat-value">{stats.totalViews}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Replies</h3>
                            <p className="stat-value">{stats.totalReplies}</p>
                        </div>
                    </div>
                )}

                <section className="blogs-section">
                    <h2>Your Published Stories</h2>
                    <div className="blogs-table-container">
                        {blogs.length > 0 ? (
                            <table className="blogs-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Views</th>
                                        <th>Replies</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map(blog => (
                                        <tr key={blog.id}>
                                            <td>{blog.title}</td>
                                            <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                                            <td>{blog.views}</td>
                                            <td>{blog.replies_count || 0}</td>
                                            <td>
                                                <Link to={`/blog/${blog.id}`} className="link-action">View</Link>
                                                <Link to={`/edit-blog/${blog.id}`} className="link-action">Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-dashboard">
                                <p>You haven't written any blogs yet.</p>
                                <Link to="/create-blog" className="btn-secondary">Start writing your first story</Link>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MyBlogs;
