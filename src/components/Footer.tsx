import "./styles/Footer.css";
import logo from "../assets/Unity.jpg";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <img src={logo} alt="Unity Logo" className="footer-logo" />
                        <p className="brand-tagline">
                            {/* Building better solutions together */}
                            Voices Of Africa
                            </p>
                    </div>

                    <div className="footer-sections">
                        <div className="footer-section">
                            <h3 className="footer-title">Navigation</h3>
                            <ul className="footer-links">    
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3 className="footer-title">Legal</h3>
                            <ul className="footer-links">
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">FAQs</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3 className="footer-title">Connect</h3>
                            <ul className="footer-social">
                                <li><a href="#" className="social-link">Facebook</a></li>
                                <li><a href="#" className="social-link">Twitter</a></li>
                                <li><a href="#" className="social-link">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Unity. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;