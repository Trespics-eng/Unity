import { BookOpen, AlertCircle, Share2, Users, Flame } from 'lucide-react';
import './styles/StepsSection.css';

const steps = [
    { id: 1, title: 'Read stories', icon: <BookOpen size={28} /> },
    { id: 2, title: 'Understand the issue', icon: <AlertCircle size={28} /> },
    { id: 3, title: 'Share or discuss', icon: <Share2 size={28} /> },
    { id: 4, title: 'Spread awareness', icon: <Users size={28} /> },
    { id: 5, title: 'Inspire change', icon: <Flame size={28} /> },
];

const StepsSection = () => {
    return (
        <section className="steps-section">
            <div className="container">
                <h2 className="steps-title">How It Works</h2>
                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={step.id} className="step-item">
                            <div className="step-icon">
                                {step.icon}
                            </div>
                            <h4 className="step-label">{step.title}</h4>
                            {index !== steps.length - 1 && (
                                <div className="step-connector"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsSection;
