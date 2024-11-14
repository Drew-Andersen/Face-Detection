// import React from "react";
// import Footer from '../footer/Footer';
// import './faceDetection.css';

// const FaceDetection = ({ imageURL, box }) => {
//     return (
//         <div className="center ma">
//             <div className="absolute mt-2">
//                 <img id="inputimage" src={imageURL} alt="Face detection image" width='500px' height='auto' />
//                 <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
//             </div>
//         </div>
//     )
// }

// export default FaceDetection;

const FaceDetection = ({ boxes, imageURL }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img
                    id="inputimage"
                    src={imageURL}
                    alt="Face Detection"
                    width="500px"
                    height="auto"
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