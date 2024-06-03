import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main';

import Authprovider from './Components/Providers/Authprovider';
import Meals from './Components/Meals/Meals';
import UpcomingMealss from './Components/UpcomingMealss/UpcomingMealss';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import { HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path:'/',
        element:<Home></Home> ,

      },
      {
        path:'/Meals',
        element:<Meals></Meals>,

      },
      {
        path:'/UpcomingMeals',
        element:<UpcomingMealss></UpcomingMealss>,

      },
      {
        path:'/Login',
        element:<Login></Login>,

      },
      {
        path:'/Register',
        element:<Register></Register>,

      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode >
    <HelmetProvider>
    <Authprovider><RouterProvider router={router} /></Authprovider>
    </HelmetProvider>
 
  </React.StrictMode>,
)
