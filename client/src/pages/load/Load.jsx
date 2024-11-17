import { Link, useLocation, useNavigate } from "react-router-dom";
import './load.css';

const Load = () => {


    return (
        <>
            <div className="container d-flex justify-content-evenly text-center">
                <Link
                    to='/login'
                    className='link-login btn'
                >
                    Login
                </Link>
                <Link
                    to='/signup'
                    className='link-signup btn'
                >
                    Sign Up
                </Link>
            </div>
        </>
    )
}

export default Load;