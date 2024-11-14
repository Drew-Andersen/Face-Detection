import React from "react";
import Tilt from 'react-parallax-tilt'; 
import './logo.css';
import face from './face2.png';

export default function Logo () {
    return(
        <div className="logo ma4 mt0">
            <Tilt className="Tilt" options={{ max: 25 }} style={{ height: 150, width: 150 }}>
                <div className="Tilt-inner">
                    <img src={face} alt="logo" className="logo-image"/>
                </div>
            </Tilt>
        </div>
    )
}
