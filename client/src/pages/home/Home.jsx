// import { Component } from 'react';
// import Rank from '../../components/rank/Rank';
// import ImageLinkForm from '../../components/imageLinkForm/ImageLinkForm';
// import FaceDetection from '../../components/faceDetection/FaceDetection';
// import Logo from '../../components/logo/Logo';
// import './home.css';
 
// class Home extends Component {
//     constructor() {
//         super();
//         this.state = {
//             input: '',
//             imageURL: '',
//             box: {},
//         }
//     }

//     onInputChange = (e) => {
//         console.log(e.target.value);
//         this.setState({ input: e.target.value });
//     }

//     calculateFaceLocatioin = (data) => {
//         const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
//         const image = document.getElementById('inputimage');
//         const width = Number(image.width);
//         const height = Number(image.height);
//         console.log(width, height);
//         return {
//             leftCol: clarifaiFace.left_col * width,
//             topRow: clarifaiFace.top_row * height,
//             rightCol: width - (clarifaiFace.right_col * width),
//             bottomRow: height - (clarifaiFace.bottom_row * height),
//         }
//     }

//     displayFaceBox = (box) => {
//         console.log(box);
//         this.setState({ box: box });
//     }

//     onButtonSubmit = () => {
//         this.setState({ imageURL: this.state.input });

//         const returnClarifaiOptions = (imageURL) => {
//             // Your PAT (Personal Access Token) can be found in the Account's Security section
//             const PAT = '874fa60878c6469181ebfd21d779414d';
//             const USER_ID = 'drewbearz';
//             const APP_ID = 'face-detection-app';
//             // const MODEL_ID = 'face-detection';
//             const IMAGE_URL = imageURL;

//             const raw = JSON.stringify({
//                 "user_app_id": {
//                     "user_id": USER_ID,
//                     "app_id": APP_ID
//                 },
//                 "inputs": [
//                     {
//                         "data": {
//                             "image": {
//                                 "url": IMAGE_URL
//                             }
//                         }
//                     }
//                 ]
//             });

//             const requestOptions = {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Authorization': 'Key ' + PAT
//                 },
//                 body: raw
//             };

//             return requestOptions;
//         }

//         // app.models.predict('face-detection', this.state.input)
//         // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiOptions(this.state.input))

//         // For cors visit (https://cors-anywhere.herokuapp.com/corsdemo) and request temp access to demo server
//         fetch('https://cors-anywhere.herokuapp.com/https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiOptions(this.state.input))
//             .then(response => response.json())
//             .then(response => this.displayFaceBox(this.calculateFaceLocatioin(response)))
//             // .then(result => {
//             // // result = output.0.data.regions.0.region_info.bounding_box
//             // console.log(result);

//             // const regions = result.outputs[0].data.regions;

//             // regions.forEach(region => {
//             //   // Accessing and rounding the bounding box values
//             //   const boundingBox = region.region_info.bounding_box;
//             //   const topRow = boundingBox.top_row.toFixed(3);
//             //   const leftCol = boundingBox.left_col.toFixed(3);
//             //   const bottomRow = boundingBox.bottom_row.toFixed(3);
//             //   const rightCol = boundingBox.right_col.toFixed(3);

//             //   region.data.concepts.forEach(concept => {
//             //     // Accessing and rounding the concept value
//             //     const name = concept.name;
//             //     const value = concept.value.toFixed(4);

//             //     console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);            

//             //   });
//             // });

//             // })
//             .catch(error => console.log('error', error));
//     }

//     render() {
//         const { imageURL, box } = this.state;
//         return (
//             <div className="home">
//                 <Logo />
//                 <Rank />
//                 <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
//                 <FaceDetection box={box} imageURL={imageURL} />
//             </div>
//         )
//     }
// }

// export default Home;

import { Component } from 'react';
import Rank from '../../components/rank/Rank';
import ImageLinkForm from '../../components/imageLinkForm/ImageLinkForm';
import FaceDetection from '../../components/faceDetection/FaceDetection';
import Logo from '../../components/logo/Logo';
import './home.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageURL: '',
            boxes: [], 
        }
    }

    onInputChange = (e) => {
        console.log(e.target.value);
        this.setState({ input: e.target.value });
    }

    calculateFaceLocation = (data) => {
        const regions = data?.outputs[0]?.data?.regions;
        
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
    
        const boxes = [];
    
        // Check if regions exist and are not empty
        if (regions && regions.length > 0) {
            // Using a for loop instead of map
            for (let i = 0; i < regions.length; i++) {
                const clarifaiFace = regions[i].region_info.bounding_box;
                const box = {
                    leftCol: clarifaiFace.left_col * width,
                    topRow: clarifaiFace.top_row * height,
                    rightCol: width - (clarifaiFace.right_col * width),
                    bottomRow: height - (clarifaiFace.bottom_row * height),
                };
                boxes.push(box); 
            }
        }
        return boxes;
    };

    displayFaceBox = (boxes) => {
        if (boxes.length === 0) {
            console.log('No faces detected');
            this.setState({ boxes: [] }); 
        } else {
            console.log(boxes);
            this.setState({ boxes: boxes }); // Set the boxes to state
        }
    };

    onButtonSubmit = () => {
        this.setState({ imageURL: this.state.input });
    
        const returnClarifaiOptions = (imageURL) => {
            const PAT = '874fa60878c6469181ebfd21d779414d';
            const USER_ID = 'drewbearz';
            const APP_ID = 'face-detection-app';
            const IMAGE_URL = imageURL;
    
            const raw = JSON.stringify({
                "user_app_id": {
                    "user_id": USER_ID,
                    "app_id": APP_ID
                },
                "inputs": [
                    {
                        "data": {
                            "image": {
                                "url": IMAGE_URL
                            }
                        }
                    }
                ]
            });
    
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Key ' + PAT
                },
                body: raw
            };
    
            return requestOptions;
        };
    
        fetch('https://cors-anywhere.herokuapp.com/https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiOptions(this.state.input))
            .then(response => response.json())
            .then(response => {
                const boxes = this.calculateFaceLocation(response);
                this.displayFaceBox(boxes);
            })
            .catch(error => {
                console.log('error', error);
            });
    };
    
    render() {
        const { imageURL, boxes } = this.state;
        return (
            <div className="home">
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceDetection boxes={boxes} imageURL={imageURL} />
            </div>
        )
    }
}

export default Home;