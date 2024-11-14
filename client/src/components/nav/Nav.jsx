import { Link, useLocation, useNavigate } from "react-router-dom";
import Auth from '../../utils/auth';
import './nav.css';


const Nav = () => {
    const currentPage = useLocation().pathname;
    const navigate = useNavigate();

    const handleSignOut = () => {
        Auth.logout();  
        navigate('/login'); 
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {Auth.loggedIn() ? (
                <>
                    <Link
                        to="/"
                        className={currentPage === '/' ? 'Link nav-item active' : 'Link nav-item'}
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        className={currentPage === '/login' ? 'Link nav-item active' : 'Link nav-item'}
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className={currentPage === '/signup' ? 'Link nav-item active' : 'Link nav-item'}
                    >
                        Sign Up
                    </Link>
                </>
            )}
        </nav>
    )
}

export default Nav;