import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    // const handleInputChange = () => {
    //     123
    // }

    // const handleFormSubmit = () => {
    //     123
    // }

    return (
        // b--white-10 mv4 w-100 w-50-m
        <div className='d-flex justify-content-center align-items-center mt-5 text-center'>
            <article className="article-login">
                <div className="border border-3 measure white">
                    <fieldset id="login" className="ba b--transparent ph0 mh0">
                        <legend className="pt-2 ph0 mh0">Login</legend>
                        <div className="mt-3">
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
                            className="login-btn b px-3 py-2 f6 dib white"
                            // disabled={!(userFormData.email && userFormData.password)}
                            type="submit"
                            value="Login"
                        // onClick = {handleFormSubmit}
                        />
                    </div>
                    <div className="lh-copy mt-3 white">
                        <Link to='/signup' className="Link f6 link dim black db pointer">Sign up</Link>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default Login;