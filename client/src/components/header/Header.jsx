import { Component } from 'react';
import Nav from "../nav/Nav";
// import Logo from '../logo/Logo';
import './header.css'; // Custom CSS for the header

class Header extends Component {
    constructor(){
        super();
        this.state = {
            isSignedIn: false,
        }
    }
    render() {
        const { isSignedIn } = this.state;
        return (
            <>
                <Nav isSignedIn={isSignedIn} />
            </>
        );
    }
}

export default Header;