// Importing the Router
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importing the CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing all pages
import App from './App';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Load from './pages/load/Load';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: localStorage.getItem('hasLoaded') ? (
          <Navigate to="/home" />  // Redirect to /home after the first load
        ) : (
          <Load />  // Show the Load component only on first load
        ),
      },
      // {
      //   index: true,
      //   element: <Load />
      // },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)


// https://face-detection-la42.onrender.com/login
// https://face-detection-la42.onrender.com/login