import "./styles/Navbar.css";
import { useState } from "react";
import logo from "../assets/Unity.jpg";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                    <img src={logo} alt="Unity logo" className="nav-logo" />
                    <span className="brand-name">UNITY</span>
                </div>

                <div className="nav-links">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/explore" className="nav-link">Explore</NavLink>
                    <NavLink to="/take-action" className="nav-link">Take Action</NavLink>
                    <NavLink to="/create-post" className="nav-link">Create Post</NavLink>
                    <NavLink to="/blog" className="nav-link">Blogs</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                            <button onClick={logout} className="nav-auth-btn">Logout</button>
                        </>
                    ) : (
                        <NavLink to="/login" className="nav-auth-btn">Login</NavLink>
                    )}
                </div>

                <button className="mobile-menu-btn" onClick={() => setOpen(!open)}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {open && (
                <div className="mobile-menu">
                    <NavLink to="/" className="mobile-link" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/explore" className="mobile-link" onClick={() => setOpen(false)}>Explore</NavLink>
                    <NavLink to="/take-action" className="mobile-link" onClick={() => setOpen(false)}>Take Action</NavLink>
                    <NavLink to="/create-post" className="mobile-link" onClick={() => setOpen(false)}>Create Post</NavLink>
                    <NavLink to="/blog" className="mobile-link" onClick={() => setOpen(false)}>Blogs</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/dashboard" className="mobile-link" onClick={() => setOpen(false)}>Dashboard</NavLink>
                            <button onClick={() => { logout(); setOpen(false); }} className="mobile-link auth-btn">Logout</button>
                        </>
                    ) : (
                        <NavLink to="/login" className="mobile-link auth-btn" onClick={() => setOpen(false)}>Login</NavLink>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;