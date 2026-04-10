import { getHero } from "../services/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/HeroCarousel.css";

interface Slide {
    id?: number;
    title: string;
    subtitle?: string;
    image_url: string;
    description: string;
}

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const res = await getHero();
                if (res.data && res.data.length > 0) {
                    setSlides(res.data);
                }    
            } catch (err) {
                console.error("Failed to fetch heroes", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHeroes();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    if (loading) {
        return (
            <div className="hero-loading">
                <div className="loading-spinner"></div>
                <p>Loading stories of change...</p>
            </div>
        );
    }

    if (!slides.length) {
        return (
            <div className="hero-empty">
                <div className="empty-content">
                    <h2>No Stories Available</h2>
                    <p>Be the first to share your story</p>
                    <button className="empty-button" onClick={() => navigate("/create-post")}>
                        Share Your Story
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="hero-carousel">
            <div className="carousel-container">
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div className="carousel-slide" key={slide.id || index}>
                            <div className="slide-overlay"></div>
                            <img 
                                src={slide.image_url} 
                                alt={slide.title} 
                                className="slide-image"
                                loading="lazy"
                            />
                            <div className="slide-content">
                                <div className="slide-badge">Featured Story</div>
                                <h1 className="slide-title">{slide.title}</h1>
                                <p className="slide-description">{slide.subtitle || slide.description}</p>
                                <button 
                                    className="slide-button" 
                                    onClick={() => navigate("/create-post")}
                                >
                                    Take Action Now
                                    <span className="button-arrow">→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {slides.length > 1 && (
                    <>
                        <button className="carousel-btn prev-btn" onClick={prevSlide}>
                            ‹
                        </button>
                        <button className="carousel-btn next-btn" onClick={nextSlide}>
                            ›
                        </button>
                        
                        <div className="carousel-dots">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentIndex ? "active" : ""}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <div className="slide-counter">
                            <span className="current-slide">{currentIndex + 1}</span>
                            <span className="slide-separator">/</span>
                            <span className="total-slides">{slides.length}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HeroCarousel;