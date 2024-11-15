import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/API'; // assuming loginUser is imported from API.js
import Auth from '../../utils/auth'; // assuming Auth.js handles token saving and redirecting
import './login.css';

const Login = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        if (!userFormData.email || !userFormData.password) {
            setErrorMessage('Please enter both email and password');
            return;
        }
    
        try {
            const response = await loginUser(userFormData);
    
            if (!response.ok) {
                const { message } = await response.json(); // Parse the error message from the API
                setErrorMessage(message || 'Login failed, please try again');
                return;
            }
    
            // If login is successful, parse the response JSON
            const data = await response.json();
            const { token, user } = data;
    
            // If token exists, save it and redirect
            if (token) {
                Auth.login(token); // Assuming Auth handles storing the token and redirect
                setUserFormData({ email: '', password: '' });
                navigate('/home'); // Redirect to the dashboard or home after login
            } else {
                setErrorMessage('No token received, please try again.');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Something went wrong. Please try again later');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5 text-center">
            <article className="article-login">
                <div className="border border-3 measure white">
                    <fieldset id="login" className="ba b--transparent ph0 mh0">
                        <legend className="pt-2 ph0 mh0">Login</legend>
                        {errorMessage && (
                            <div className="error-message">
                                <p className="text-danger">{errorMessage}</p>
                            </div>
                        )}
                        <div className="mt-3">
                            <label className="db lh-copy" htmlFor="email">Email</label>
                            <input
                                className="form-input bg-transparent"
                                type="email"
                                name="email"
                                value={userFormData.email}
                                id="email"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="my-3">
                            <label className="db lh-copy" htmlFor="password">Password</label>
                            <input
                                className="form-input bg-transparent"
                                type="password"
                                name="password"
                                value={userFormData.password}
                                id="password"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="login-btn b px-3 py-2 f6 dib white"
                            type="submit"
                            value="Login"
                            onClick={handleFormSubmit}
                        />
                    </div>
                    <div className="lh-copy mt-3 white">
                        <Link to="/signup" className="Link f6 link dim black db pointer">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Login;