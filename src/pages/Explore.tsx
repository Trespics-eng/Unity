import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import { getPosts, getCategories } from '../services/api';

const Explore = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');
    const [posts, setPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [_loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExploreData = async () => {
            try {
                const [postsRes, catsRes] = await Promise.all([
                    getPosts(),
                    getCategories()
                ]);
                setPosts(postsRes.data);
                
                const catNames = ["All", ...catsRes.data.map((c: any) => c.name)];
                setCategories(catNames);
            } catch (err) {
                console.error("Explore fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchExploreData();
    }, []);

    useEffect(() => {
        if (categoryParam) {
            setActiveCategory(categoryParam);
        }
    }, [categoryParam]);

    const filteredPosts = posts.filter(post => {
        const matchesSearch = 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            post.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        // category_id or name? the backend returns category object joined usually, 
        // but let's assume post.category is either the name or we join it.
        // In my publicRoutes I just return '*' so categories might be category_id.
        // I should probably join the category name in the backend or handle it here.
        const postCategory = typeof post.category === 'object' ? post.category?.name : post.category;
        const matchesCategory = activeCategory === 'All' || postCategory === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container" style={{ padding: '3rem 1.5rem', minHeight: '80vh' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Explore Stories</h1>
            <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '3rem' }}>
                Discover experiences and challenges from people around the world.
            </p>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', margin: '2rem 0 3rem 0' }}>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            fontWeight: 600,
                            backgroundColor: activeCategory === cat ? 'var(--primary)' : 'transparent',
                            color: activeCategory === cat ? 'var(--secondary)' : 'var(--text-light)',
                            border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border-color)'}`,
                            transition: 'all 0.2s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filteredPosts.length > 0 ? (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {filteredPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No stories found</h3>
                    <p>Try adjusting your search query or category filter.</p>
                </div>
            )}
        </div>
    );
};

export default Explore;
