import { Link } from 'react-router-dom';
import { MapPin, Clock, MessageCircle, Heart, Share2, Bookmark, Eye } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import './styles/PostCard.css';

interface PostCardProps {
    post: {
        id: string;
        title: string;
        category: string;
        description: string;
        location?: string;
        image?: string;
        image_url?: string;
        createdAt: string;
        repliesCount?: number;
        views?: number;
        likes?: number;
        author?: {
            name: string;
            avatar?: string;
        };
    };
}

const PostCard = ({ post }: PostCardProps) => {
    const truncate = (str: string, n: number) => {
        if (!str) return '';
        return str.length > n ? str.substring(0, n) + '...' : str;
    };

    const formatDate = (isoString: string) => {
        if (!isoString) return 'Recently';
        const date = new Date(isoString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getImageUrl = () => {
        return post.image || post.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop';
    };

    return (
        <div className="post-card">
            <div className="post-card-image-wrapper">
                <Link to={`/post/${post.id}`} className="post-card-image-link">
                    <img 
                        src={getImageUrl()} 
                        alt={post.title} 
                        className="post-card-image"
                        loading="lazy"
                    />
                    <div className="post-card-overlay">
                        <Eye size={20} />
                        <span>Read Story</span>
                    </div>
                </Link>
                {post.category && (
                    <div className="post-card-category-tag">
                        <CategoryBadge category={post.category} />
                    </div>
                )}
            </div>

            <div className="post-card-content">
                <div className="post-card-header">
                    <div className="post-card-meta">
                        <div className="post-card-location">
                            <MapPin size={14} />
                            <span>{post.location || 'Africa'}</span>
                        </div>
                        <div className="post-card-date">
                            <Clock size={14} />
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                    </div>
                    
                    {post.author && (
                        <div className="post-card-author">
                            {post.author.avatar ? (
                                <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                            ) : (
                                <div className="author-avatar-placeholder">
                                    {post.author.name?.charAt(0) || 'A'}
                                </div>
                            )}
                            <span className="author-name">{post.author.name || 'Anonymous'}</span>
                        </div>
                    )}
                </div>

                <Link to={`/post/${post.id}`} className="post-card-title-link">
                    <h3 className="post-card-title">{truncate(post.title, 60)}</h3>
                </Link>

                <p className="post-card-description">
                    {truncate(post.description, 150)}
                </p>

                <div className="post-card-stats">
                    <div className="stat-item">
                        <MessageCircle size={16} />
                        <span>{post.repliesCount || 0} replies</span>
                    </div>
                    <div className="stat-item">
                        <Heart size={16} />
                        <span>{post.likes || 0} likes</span>
                    </div>
                    <div className="stat-item">
                        <Eye size={16} />
                        <span>{post.views || 0} views</span>
                    </div>
                </div>

                <div className="post-card-actions">
                    <Link to={`/post/${post.id}`} className="action-button read-more-btn">
                        Read Full Story
                        <span className="btn-arrow">→</span>
                    </Link>
                    <div className="action-icons">
                        <button className="icon-btn" aria-label="Like">
                            <Heart size={18} />
                        </button>
                        <button className="icon-btn" aria-label="Bookmark">
                            <Bookmark size={18} />
                        </button>
                        <button className="icon-btn" aria-label="Share">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;