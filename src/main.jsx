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
import Privetroot from './Components/Privetroot/Privetroot';
import Details from './Components/Details/Details';

import Dashboard from './Components/Dashboard/Dashboard';
import RequestedMeals from './Components/Udashboard/RequestedMeals';
import MyProfile from './Components/Myprofile/MyProfile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManageUsers from './Components/ADashboard/ManageUsers';
import Subscription from './Components/Subscription/Subscription';
import AdminRoute from './Components/AdminRoute/AdminRoute';
import AddFood from './Components/AddFood/AddFood';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,

      },
      {
        path: '/Meals',
        element: <Meals></Meals>,
        loader: () => fetch('http://localhost:5000/meals')

      },
      {
        path: '/UpcomingMeals',
        element: <UpcomingMealss></UpcomingMealss>,

      },
      {
        path: '/Login',
        element: <Login></Login>,

      },
      {
        path: '/Register',
        element: <Register></Register>,

      },
      {
        path: '/subscription',
        element: <Subscription></Subscription>,

      },
      {
        path: '/details/:id',
        element: <Privetroot><Details></Details></Privetroot>,
        loader: () => fetch('http://localhost:5000/meals')

      },



    ]
  },
  {
    path: 'uDashboard',
    element: <Privetroot><Dashboard></Dashboard></Privetroot>,
    children: [{
      path: 'requestedMeals',
      element: <RequestedMeals></RequestedMeals>
    },
    {
      path: 'uDashboard/myProfile',
      element: <Privetroot><MyProfile></MyProfile></Privetroot>,
      loader: () => fetch('http://localhost:5000/users')
    }, 
    {
      path: 'uDashboard/manageUsers',
      element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
      
    },
    {
      path: 'uDashboard/addMeals',
      element: <AdminRoute><AddFood></AddFood></AdminRoute>,
      
    },
  ]
  }
]);
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode >
    <Authprovider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </Authprovider>


  </React.StrictMode>,
)
