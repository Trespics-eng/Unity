import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { getPosts } from '../services/api';
import './styles/FeaturedPosts.css';

const FeaturedPosts = () => {
    const [featured, setFeatured] = useState<any[]>([]);

    useEffect(() => {
        getPosts(true)
            .then(res => setFeatured(res.data.slice(0, 3)))
            .catch(err => console.error('Failed to fetch featured posts:', err));
    }, []);

    return (
        <section className="featured-section">
            <div className="container">
                <div className="featured-header">
                    <h2 className="featured-title">Stories That Need Attention</h2>
                    <p className="featured-subtitle">Read and share these pressing stories to bring them to light.</p>
                </div>
                
                <div className="featured-grid">
                    {featured.map(post => (
                        <div key={post.id} className="featured-card-wrapper">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPosts;
