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
import AdminProfile from './Components/AdminProfile/AdminProfile';
import AdminAllFood from './Components/AdminAllFood/AdminAllFood';
import UpdateItem from './Components/AdminUpdateItem/UpdateItem';
import AdminAllReviews from './Components/AdminAllrevuews/AdminAllReviews';
import AdminAddUpcomingMeals from './Components/AdminAddUpcomingMeals/AdminAddUpcomingMeals';
import UserReviews from './Components/UserReviews/UserReviews';
import EditReview from './Components/EditReview/EditReview';
import Payment from './Components/Payment/Payment';
import PaymentHistory from './Components/PaymentHistory/PaymentHistory';
import AllPayment from './Components/Payment/CheckoutForm/AllPayment';
import ServeMeals from './Components/ServeMeals/ServeMeals';
import Error from './Components/Error/Error';
import FoodChart from './Components/FoodChart/FoodChart';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<Error></Error>,
    
    children: [
      {
        path: '/',
        element: <Home></Home>,

      },
      {
        path: '/Meals',
        element: <Privetroot><Meals></Meals></Privetroot>,
        loader: () => fetch('https://hostel-blaze-server.vercel.app/meals')

      },
      {
        path: '/UpcomingMeals',
        element: <Privetroot><UpcomingMealss></UpcomingMealss></Privetroot>,
        loader: () => fetch('https://hostel-blaze-server.vercel.app/upComingMeals')


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
        element: <Privetroot><Subscription></Subscription></Privetroot>,

      },
      {
        path: '/foodChart',
        element: <Privetroot><FoodChart></FoodChart></Privetroot>,
        loader: () => fetch('https://hostel-blaze-server.vercel.app/meals')

      },
    
      {
        path: '/details/:id',
        element: <Privetroot><Details></Details></Privetroot>,
        loader: () => fetch('https://hostel-blaze-server.vercel.app/meals')

      },



    ]
  },
  {
    path: 'uDashboard',
    element: <Privetroot><Dashboard></Dashboard></Privetroot>,
    errorElement:<Error></Error>,
    children: [{
      path: 'requestedMeals',
      element: <RequestedMeals></RequestedMeals>
    },
    {
      path: 'myProfile',
      element: <Privetroot><MyProfile></MyProfile></Privetroot>,
      loader: () => fetch('https://hostel-blaze-server.vercel.app/users')
    },
    {
      path: 'myReviews',
      element: <Privetroot><UserReviews></UserReviews></Privetroot>,
      loader: () => fetch('https://hostel-blaze-server.vercel.app/users')
    },
    {
      path: 'payment/:id',
      element: <Privetroot><Payment></Payment></Privetroot>,
      loader: () => fetch('https://hostel-blaze-server.vercel.app/membership')
     
    },
    {
      path: 'allPayment',
      element: <Privetroot><AllPayment></AllPayment></Privetroot>,
    
     
    },
    {
      path: 'paymentHistory',
      element: <Privetroot><PaymentHistory></PaymentHistory></Privetroot>,
    },
    {
      path: 'editReview/:id',
      element: <Privetroot><EditReview></EditReview></Privetroot>,
      loader: ({ params }) => fetch(`https://hostel-blaze-server.vercel.app/meals/${params.id}`)
    },
    {
      path: 'manageUsers',
      element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,

    },
    {
      path: 'serveMeals',
      element: <AdminRoute><ServeMeals></ServeMeals></AdminRoute>,

    },
    {
      path: 'addMeals',
      element: <AdminRoute><AddFood></AddFood></AdminRoute>,

    },
    {
      path: 'addUpcomingMeals',
      element: <AdminRoute><AdminAddUpcomingMeals></AdminAddUpcomingMeals></AdminRoute>,

    },
    {
      path: 'adminProfile',
      element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>,
      loader: () => fetch('https://hostel-blaze-server.vercel.app/users'),


    },
    {
      path: 'allMeals',
      element: <AdminRoute><AdminAllFood></AdminAllFood></AdminRoute>,


    },
    {
      path: 'updateItem/:id',
      element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
      loader: ({ params }) => fetch(`https://hostel-blaze-server.vercel.app/meals/${params.id}`)

    },

    {
      path: 'allReviews',
      element: <AdminRoute><AdminAllReviews></AdminAllReviews></AdminRoute>,

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
