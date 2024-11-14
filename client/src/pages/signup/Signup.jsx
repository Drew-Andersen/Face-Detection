import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';

const Signup = () => {
    // const handleInputChange = () => {
    //     123
    // }

    // const handleFormSubmit = () => {
    //     123
    // }

    return (
        <div className='d-flex justify-content-center align-items-center mt-5 text-center'>
            <article className="article-signup">
                {/* changed the form element to a div for better customization */}
                <div className="border border-3 measure white">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="pt-2 ph0 mh0">Sign Up</legend>
                        <div className="mt-3">
                            <label className="db lh-copy" htmlFor="name">Name</label>
                            <input
                                className="form-input bg-transparent"
                                type="text"
                                name="name"
                                // value={userFormData.name}
                                id="name"
                            // onChange={handleInputChange}
                            />
                        </div>
                        <div className="my-3">
                            <label className="db lh-copy" htmlFor="email-address">Email</label>
                            <input
                                className="form-input bg-transparent"
                                type="email"
                                name="email"
                                // value={userFormData.email}
                                id="email"
                                // onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="my-3">
                            <label className="db lh-copy" htmlFor="password">Password</label>
                            <input
                                className="form-input bg-transparent"
                                type="password"
                                name="password"
                                // value={userFormData.password}
                                id="password"
                                // onChange={handleInputChange}
                                required
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="signup-btn b px-3 py-2 f6 dib white"
                            type="submit"
                            value="Sign up"
                        // onClick={handleFormSubmit}
                        />
                    </div>
                    <div className="lh-copy mt-3 white">
                        <Link to='/login' className="f6 link dim black db white pointer">Login</Link>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default Signup;