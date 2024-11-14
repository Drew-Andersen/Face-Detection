import Rank from '../../components/rank/Rank';
import ImageLinkForm from '../../components/imageLinkForm/ImageLinkForm';
import FaceDetection from '../../components/faceDetection/FaceDetection';
import Logo from '../../components/logo/Logo';
import './home.css';

export default function Home () {
    return(
        <div className="home">
            <Logo />
            <Rank />
            <ImageLinkForm />
            <FaceDetection />
        </div>
    )
}