import React from "react";
import './imageLinkForm.css';

const ImageLinkForm = () => {
    return(
        <div>
            <p className="f3 white">
                {'This magic app will detect faces in your pictures.'}
            </p>
            <div className="center">
                <div className="center form">
                    <input type="text" className="form-input center" placeholder="Input a URL here..." />
                    <button className="form-btn px-3 py-2 white" >Detect</button>
                </div>
            </div>
            </div>
    )
}

export default ImageLinkForm;