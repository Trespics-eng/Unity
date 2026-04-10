import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './styles/ActionCard.css';

interface ActionCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

const ActionCard = ({ icon, title, description, buttonText, buttonLink }: ActionCardProps) => {
    return (
        <div className="action-card card-shadow card-shadow-hover rounded-xl">
            <div className="action-icon-wrapper">
                {icon}
            </div>
            <h3 className="action-title">{title}</h3>
            <p className="action-desc">{description}</p>
            <Link to={buttonLink} className="action-btn">
                {buttonText}
            </Link>
        </div>
    );
};

export default ActionCard;
