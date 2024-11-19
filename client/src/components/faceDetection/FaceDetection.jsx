import React from "react";
import './faceDetection.css';

const FaceDetection = ({ boxes, imageURL }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img
                    id="inputimage"
                    src={imageURL}
                    alt="Face Detection"
                    className="detection-img"
                    onLoad={() => console.log('Image loaded')} // Add this to confirm image loading
                />
                {boxes && boxes.length > 0 && boxes.map((b, index) => {
                    return (
                        <div
                            key={index}
                            className="bounding-box"
                            style={{
                                top: b.topRow,
                                right: b.rightCol,
                                bottom: b.bottomRow,
                                left: b.leftCol
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
export default FaceDetection;