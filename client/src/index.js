import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from './components/ProtectedRoute';
import Store from './utils/Store';



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      }, 
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/home",
        element: <ProtectedRoute />
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  

  <Provider store={Store}>
  <RouterProvider router={appRouter} />
  </Provider>
 
);

reportWebVitals();
