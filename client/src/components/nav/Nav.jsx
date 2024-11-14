import React from "react";
import './nav.css';

const Nav = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: "flex-end" }}>
            <p className="nav-item white pa3 pointer">Sign Out</p>
        </nav>
    )
   
}

export default Nav;