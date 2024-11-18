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
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            },
            token: '',
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('id_token');
        console.log('Token in localStorage:', token)
        if (token) {
            this.setState({ token }, this.fetchUserData); 
        }
    }

    fetchUserData = () => {
        const { token } = this.state;

        // http://localhost:3001/api/users/me
        fetch('/api/users/me', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(user => {
            console.log('Fetched user data:', user);
            this.setState({ user });
        })
        .catch(err => {
            console.log('Error fetching user data:', err);
        });
    }

    onInputChange = (e) => {
        console.log(e.target.value);
        this.setState({ input: e.target.value });
    }

    calculateFaceLocation = (data) => {
        const regions = data?.outputs[0]?.data?.regions;
        if (!regions || regions.length === 0) {
            console.log('No faces detected');
            return [];
        }

        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log('width', width);
        console.log('height', height);

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

    // onButtonSubmit = () => {
    //     this.setState({ imageURL: this.state.input });

    //     const returnClarifaiOptions = (imageURL) => {
    //         const PAT = '874fa60878c6469181ebfd21d779414d';
    //         const USER_ID = 'drewbearz';
    //         const APP_ID = 'face-detection-app';
    //         const IMAGE_URL = imageURL;

    //         const raw = JSON.stringify({
    //             "user_app_id": {
    //                 "user_id": USER_ID,
    //                 "app_id": APP_ID
    //             },
    //             "inputs": [
    //                 {
    //                     "data": {
    //                         "image": {
    //                             "url": IMAGE_URL
    //                         }
    //                     }
    //                 }
    //             ]
    //         });

    //         const requestOptions = {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Authorization': 'Key ' + PAT
    //             },
    //             body: raw
    //         };

    //         return requestOptions;
    //     };

    //     fetch('https://cors-anywhere.herokuapp.com/https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiOptions(this.state.input))
    //         .then(response => response.json())
    //         .then(response => {
    //             const boxes = this.calculateFaceLocation(response);
    //             this.displayFaceBox(boxes);
    //             this.incrementEntries();
    //         })
    //         .catch(error => {
    //             console.log('error', error);
    //         });
    // };

    onButtonSubmit = () => {
        this.setState({ imageURL: this.state.input });
    
        fetch('/api/clarifai/face-detection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`  // Optional, in case you need to authenticate this API call
            },
            body: JSON.stringify({ imageURL: this.state.input })
        })
        .then(response => response.json())
        .then(response => {
            const boxes = this.calculateFaceLocation(response);
            this.displayFaceBox(boxes);
            this.incrementEntries();
        })
        .catch(error => {
            console.log('Error:', error);
        });
    };

    incrementEntries = () => {
        const { token } = this.state;
        
        // http://localhost:3001/api/users/entries
        fetch('/api/users/entries', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Updated entries from backend:', data);
            if (data.entries !== undefined) {
                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        entries: data.entries 
                    }
                }));
            } else {
                console.error('Entries field not found in the response:', data);
            }
        })
        .catch(err => {
            console.log('Error updating entries:', err);
        });
    };

    render() {
        const { imageURL, boxes, user } = this.state;
        return (
            <div className="home">
                <Logo />
                <Rank name={user.name} entries={user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceDetection boxes={boxes} imageURL={imageURL} />
            </div>
        )
    }
}

export default Home;