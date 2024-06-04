import { Helmet } from "react-helmet";
import { Link, Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Providers/Authprovider";
import { useContext } from "react";
import Swal from "sweetalert2";

const Details = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams();
    const meals = useLoaderData();
    const details = meals?.find(item => item._id === id)
    const { _id, country, price, quantity, category, title,  mealImage, description,ingredients } = details
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    


    const updatedFoods = { _id, time:{year:year,month:month,day:day}, title, quantity: parseInt(quantity) - 1,description, price, category, adminName: user?.displayName, mealImage, isSold: true, buyersEmail: user?.email,ingredients };
   
    return (
        <div>
              <Helmet>
                    <title>Details</title>
                </Helmet>
                <div className="d1">
                     <h1 className=" mt-72 rounded-xl text-center m-auto bg-black/30 p-10  text-6xl text-white font-bold flex justify-center">Check the Details</h1>
                </div>
            <div className="md:flex shadow-lg  gap-10 md:p-10  ">
              
               
                <div className="md:flex-1 flex justify-center">
                    <img className="w-[600px] h-full max-sm:mb-5 rounded-2xl" src={mealImage} alt="" />
                </div>
            
                <div className='md:flex-1 md:space-y-3'>
                    <h2 className="font-bold">Food Name: {title}</h2>
                    <p className="font-bold text-xl">Made BY:{user?.displayName}</p>
                    <h2 className="font-bold">Category: {category}</h2>
                    <p>{description}</p>
                    <div className='flex justify-between'>
                        <h2 className="font-bold">Country: {country}</h2>
                        <h2 className="font-bold text-red-500">Quantity: <span className='mx-1'>{quantity}</span></h2>

                    </div>
                    <p className="font-bold">Price: {price} $</p>


                    <div className="flex justify-between">
                        <Link to={-1}><button className="  my-5 text-center px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 border hover:border-red-500 text-white font-bold">Back</button></Link>

                        <Link  to={`/purchase/uptodate/${_id}`} ><button className="  my-5 text-center px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 border hover:border-red-500 text-white font-bold">Purchase Now</button></Link>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Details;