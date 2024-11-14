import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

import { createUser } from '../../utils/API';
import Auth from '../../utils/auth';

const Signup = () => {
    const [userFormData, setUserFormData] = useState({ name: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(''); // To show errors to the user
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        try {
            // Attempt to create the user
            const { token, user } = await createUser(userFormData);
            // If the user is created successfully, log them in
            if(token){
                Auth.login(token);
                navigate('/home');
            } else {
                setErrorMessage('No token received, please try again.');
            }
            
            setUserFormData({ name: '', email: '', password: '' });
        } catch (err) {
            // If an error occurs, display the error message
            setErrorMessage(err.message || 'Something went wrong!');
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-5 text-center'>
            <article className="article-signup">
                <div className="border border-3 measure white">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="pt-2 ph0 mh0">Sign Up</legend>
                        <div className="mt-3">
                            <label className="db lh-copy" htmlFor="name">Name</label>
                            <input
                                className="form-input bg-transparent"
                                type="text"
                                name="name"
                                value={userFormData.name}
                                id="name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="my-3">
                            <label className="db lh-copy" htmlFor="email-address">Email</label>
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

                    {/* Show error message if there is one */}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <div className="">
                        <input
                            className="signup-btn b px-3 py-2 f6 dib white"
                            type="submit"
                            value="Sign up"
                            onClick={handleFormSubmit}
                        />
                    </div>
                    <div className="lh-copy mt-3 white">
                        <Link to='/login' className="Link f6 link dim black db pointer">Login</Link>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Signup;