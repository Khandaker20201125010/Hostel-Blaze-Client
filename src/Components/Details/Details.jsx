import { Helmet } from "react-helmet";
import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Providers/Authprovider";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import useCountAxois from "../AxoisHook/useCountAxois";
import useMealQuary from "../useMeakQuary/useMealQuary";

const Details = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const meals = useLoaderData();
    const details = meals?.find(item => item._id === id);
    const { _id, country, price, like, category, title, mealImage, description, ingredients } = details;
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const [likes, setLikes] = useState(0);
    const navigate = useNavigate();
    const axiosSecure = useCountAxois();
    const location = useLocation();
    const [, refetch] = useMealQuary()

    const updatedFoods = { _id, time: { year, month, day }, title, like: parseInt(like) + 1, description, price, category, adminName: user?.displayName, mealImage, isSold: true, buyersEmail: user?.email, ingredients };

    useEffect(() => {
        axios.get('http://localhost:5000/likes')
            .then(response => {
                setLikes(response.data.count);
            })
            .catch(error => {
                console.error('There was an error fetching the likes!', error);
            });
    }, []);

    const handelAddCart = () => {
        if (user && user.email) {
            if (!user.isSubscribed) {
                Swal.fire({
                    title: "Subscription Required",
                    text: "You need to subscribe to request this meal.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Subscribe Now"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/subscription');
                    }
                });
                return;
            }

            const cartItem = {
                menuID: _id,
                email: user.email,
                name: user.displayName,
                mealImage,
            };
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Request has been sent",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        });
                    }
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                });
        } else {
            Swal.fire({
                title: "Please Log in",
                text: "Please log in to add",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log in!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/Login', { state: { from: location } });
                }
            });
        }
    };

    const handleLike = () => {
        axios.post('http://localhost:5000/meals')
            .then(response => {
                setLikes(response.data.count);
            })
            .catch(error => {
                console.error('There was an error updating the likes!', error);
            });
    };

    return (
        <div>
            <Helmet>
                <title>Details</title>
            </Helmet>
            <div className="d1">
                <h1 className="mt-72 rounded-xl text-center m-auto bg-black/30 p-10 text-6xl text-white font-bold flex justify-center">Check the Details</h1>
            </div>
            <div className="md:flex shadow-lg gap-10 md:p-10">
                <div className="md:flex-1 flex justify-center">
                    <img className="w-[600px] h-full max-sm:mb-5 rounded-2xl" src={mealImage} alt="" />
                </div>
                <div className='md:flex-1 md:space-y-3'>
                    <h2 className="font-bold">Food Name: {title}</h2>
                    <p className="font-bold text-xl">Made BY: {user?.displayName}</p>
                    <h2 className="font-bold">Category: {category}</h2>
                    <p>{description}</p>
                    <div className='flex justify-between'>
                        <h2 className="font-bold">Country: {country}</h2>
                    </div>
                    <p className="font-bold">Price: {price} $</p>
                    <div className="flex justify-between">
                        <Link to={-1}><button className="my-5 text-center px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 border hover:border-red-500 text-white font-bold">Back</button></Link>
                        <Link><button onClick={handelAddCart} className="my-5 text-center px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 border hover:border-red-500 text-white font-bold">Request meal</button></Link>
                        <button onClick={handleLike} className="my-5 text-center px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 border hover:border-red-500 text-white font-bold">{like}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
