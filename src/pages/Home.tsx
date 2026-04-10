import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import PostCard from '../components/PostCard';
import CategoryBadge from '../components/CategoryBadge';
import { getPosts, getCategories } from '../services/api';

const Home = () => {
    const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [_loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [postsRes, catsRes] = await Promise.all([
                    getPosts(true), // featured
                    getCategories()
                ]);
                setFeaturedPosts(postsRes.data);
                setCategories(catsRes.data);
            } catch (err) {
                console.error("Home data fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeData();
    }, []);

    return (
        <div>
            <HeroSection />
            
            <section className="container" style={{ padding: '4rem 1.5rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Featured Stories</h2>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {featuredPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/explore" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                        View All Stories
                    </Link>
                </div>
            </section>

            <section style={{ backgroundColor: '#f3f4f6', padding: '4rem 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Explore by Category</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                        {categories.map(cat => (
                            <Link 
                                key={cat.id}
                                to={`/explore?category=${cat.name}`} 
                                style={{
                                    backgroundColor: 'var(--secondary)',
                                    padding: '1rem 2rem',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <CategoryBadge category={cat.name} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
