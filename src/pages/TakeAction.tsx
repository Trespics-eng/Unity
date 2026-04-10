import { Link } from 'react-router-dom';
import ActionCard from '../components/ActionCard';
import StepsSection from '../components/StepsSection';
import ImpactStats from '../components/ImpactStats';
import FeaturedPosts from '../components/FeaturedPosts';
import CTASection from '../components/CTASection';
import { Share, HeartHandshake, MessageCircle, MapPin } from 'lucide-react';
import './styles/TakeAction.css';

const TakeAction = () => {
    return (
        <div className="take-action-page">
            {/* Hero Section */}
            <section className="take-action-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Be Part of the Change</h1>
                        <p className="hero-subtitle">
                            Small actions from many people can create real impact.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/explore" className="btn-primary hero-btn">
                                Explore Stories
                            </Link>
                            <Link to="/create-post" className="btn-accent hero-btn">
                                Share Your Story
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ways to Take Action Grid */}
            <section className="ways-to-action">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Ways to Take Action</h2>
                        <p className="section-subtitle">Choose how you want to make a difference today.</p>
                    </div>
                    
                    <div className="action-grid">
                        <ActionCard 
                            icon={<HeartHandshake size={32} />}
                            title="Share a Story"
                            description="Tell your experience and let the world hear you."
                            buttonText="Create Post"
                            buttonLink="/create-post"
                        />
                        <ActionCard 
                            icon={<Share size={32} />}
                            title="Spread Awareness"
                            description="Share stories with your friends and social platforms."
                            buttonText="Share Now"
                            buttonLink="/explore"
                        />
                        <ActionCard 
                            icon={<MessageCircle size={32} />}
                            title="Start Conversations"
                            description="Engage in discussions and exchange ideas."
                            buttonText="Explore Posts"
                            buttonLink="/explore"
                        />
                        <ActionCard 
                            icon={<MapPin size={32} />}
                            title="Highlight Local Issues"
                            description="Bring attention to challenges in your community."
                            buttonText="View Stories"
                            buttonLink="/explore"
                        />
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <StepsSection />

            {/* Featured Stories Section */}
            <FeaturedPosts />

            {/* Impact Section */}
            <ImpactStats />

            {/* CTA Section */}
            <CTASection />
        </div>
    );
};

export default TakeAction;
