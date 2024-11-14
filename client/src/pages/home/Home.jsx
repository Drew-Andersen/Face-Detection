import Rank from '../../components/rank/Rank';
import ImageLinkForm from '../../components/imageLinkForm/ImageLinkForm';
import FaceDetection from '../../components/faceDetection/FaceDetection';
import './home.css';

export default function Home () {
    return(
        <div className="home">
            <Rank />
            <ImageLinkForm />
            <FaceDetection />
        </div>
    )
}