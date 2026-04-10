import { Link } from 'react-router-dom';
import './styles/CTASection.css';

const CTASection = () => {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-content rounded-xl">
                    <h2 className="cta-title">Your voice matters. Your action matters.</h2>
                    <p className="cta-subtitle">Don't wait for change. Be the spark that ignites it.</p>
                    <div className="cta-buttons">
                        <Link to="/create-post" className="btn-primary cta-btn">
                            Share Your Story
                        </Link>
                        <Link to="/explore" className="btn-accent cta-btn">
                            Explore Stories
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
