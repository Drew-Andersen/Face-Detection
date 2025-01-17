import React from "react";
import './imageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onFileChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 white">
                {'This magic app will detect faces in your pictures.'}
            </p>
            <div className="center">
                <div className="center form">
                    <input 
                        type="text" 
                        className="form-input center text-black" 
                        placeholder="Input a URL here..." 
                        onChange={onInputChange} 
                    />
                    <button 
                        className="form-btn px-3 py-2 white" 
                        onClick={onButtonSubmit} 
                    >
                        Detect
                    </button>
                </div>
            </div>
            <div className="center">
                <div className="center form">
                    <input 
                        type="file" 
                        className="form-input file center text-black" 
                        onChange={onFileChange} 
                    />
                    <button 
                        className="form-btn px-3 py-2 white" 
                        onClick={onButtonSubmit} 
                    >
                        Upload and Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;