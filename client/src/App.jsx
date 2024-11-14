import { Outlet } from 'react-router-dom';
import Particles from 'particles-bg';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import './App.css';

function App() {
  const particlesOptions = {
    particles: {
      line_linked: {
        shadow: {
          enable: true,
          color: '#3CA9D1',
          blur: 5
        },
      }
    }
  }

  return (
    <>
      <div>
        <Particles type='cobweb' params={particlesOptions} bg={true} color='#ffffff' /> 
        <Header/>
          <Outlet/>
        <Footer className='footer' />
      </div>
    </>
  )
}

export default App