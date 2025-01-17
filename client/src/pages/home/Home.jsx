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
            file: null, // Store the uploaded file
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
        if (token) {
            this.setState({ token }, this.fetchUserData); 
        }
    }

    fetchUserData = () => {  
        const { token } = this.state;
        if (!token) {
            console.log('No token found');
            return;
        }

        fetch('/api/users/me', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(user => {
            this.setState({ user });
        })
        .catch(err => {
            console.log('Error fetching user data:', err);
        });
    };

    onInputChange = (e) => {
        this.setState({ input: e.target.value });
    };

    onFileChange = (e) => {
        const file = e.target.files[0];
        this.setState({ file });
    };

    onButtonSubmit = () => {
        const { file, input, token } = this.state;

        if (file) {
            // Send the file to the server
            const formData = new FormData();
            formData.append('image', file);

            fetch('/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('File upload successful:', data);
                // Process the file (e.g., call Clarifai API with the uploaded image URL)
            })
            .catch(err => {
                console.log('Error uploading file:', err);
            });
        } else if (input) {
            // Use the URL if no file is selected
            fetch('/api/clarifai/face-detection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ imageURL: input })
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
        }
    };

    // Add methods for face detection and updating user entries here...

    render() {
        const { imageURL, boxes, user } = this.state;
        console.log(user);
        
        return (
            <div className="home">
                <Logo />
                {/* <Rank name={user.name} entries={user.entries} /> */}
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceDetection boxes={boxes} imageURL={imageURL} />
            </div>
        )
    }
}

export default Home;