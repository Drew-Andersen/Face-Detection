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
        console.log('Token being sent:', token);

        if(!token) {
            console.log('No token found');
            return;
        }

        // http://localhost:3001/api/users/me
        fetch('/api/users/me', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
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
            this.setState({ boxes: boxes }); 
        }
    };

    onButtonSubmit = () => {
        this.setState({ imageURL: this.state.input });
    
        fetch('/api/clarifai/face-detection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
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
        console.log(user);
        
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