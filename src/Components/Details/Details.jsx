import  { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Providers/Authprovider";
import Swal from "sweetalert2";
import useCountAxois from "../AxoisHook/useCountAxois";
import useMeals from "../Hooks/useMeals";
import { IoIosTimer } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import moment from "moment";
import useSubscription from "../Hooks/useSubscription";
import { toast } from "react-toastify";
import { GoCodeReview } from "react-icons/go";

const Details = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const meals = useLoaderData();
    const details = meals?.find(item => item._id === id);
    
    const { _id, title, price, likes, likers, rating, mealImage, description, adminName, ingredients, postTime, category, reviews, email, distributorName, } = details;
    const navigate = useNavigate();
    const axiosSecure = useCountAxois();
    const location = useLocation();
    const [,,refetch] = useMeals();
    const { register, handleSubmit, reset } = useForm();
   const [isSubscribe] = useSubscription();
    console.log(isSubscribe)
    const suggestedMeals = meals.filter(meal => meal.category === category && meal._id !== id); // Exclude the current meal
    const handleLike = async () => {
        if (likers.includes(user.email)) return;

        const updatedDetails = { ...details, likers: [...likers, user.email], likes: likes + 1 };
        await axiosSecure.patch(`/meals/like/${id}`, updatedDetails);
        refetch();
        toast.success("You liked the meal!", {
            position: "top-end",
            autoClose: 1500,
        });
    };

    const handleReviews = async (data) => {
        const newReview = {
            review: data.reviews,
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            reviewTime: moment().format('MMMM Do YYYY, h:mm:ss a')
        };

        const updatedReviews = reviews ? [...reviews, newReview] : [newReview];
        const updatedDetails = { ...details, reviews: updatedReviews };

        try {
            await axiosSecure.patch(`/meals/reviews/${id}`, updatedDetails);
            refetch();
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review has been added",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error adding review:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    const handleAddToCart = () => {
        if(!isSubscribe){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: 'Please Subscribe ',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/subscription')
            // refetch cart to update the cart items count
           
        }else{
            if (user && user.email) {
                //send cart item to the database
                const cartItem = {
                    menuID: _id,
                    email: user.email,
                    name: user.displayName,
                    mealImage,
                    reviews:reviews.length,
                    likers,
                    title,
                    status:'Pending'
                }
                axiosSecure.post('/carts', cartItem)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${name} added to your cart`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            // refetch cart to update the cart items count
                            refetch();
                        }
    
                    })
            }
            else {
                Swal.fire({
                    title: "You are not Logged In",
                    text: "Please login to add to the cart?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, login!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //   send the user to the login page
                        navigate('/Login', { state: { from: location } })
                    }
                });
            }

        }
       
    }
    
    

    return (
        <div className="">
            <Helmet>
                <title>Details</title>
            </Helmet>
            <div className="d1">
                <h1 className="mt-72 rounded-xl text-center m-auto bg-black/30 p-10 text-6xl text-white font-bold flex justify-center">Check the Details</h1>
            </div>
            <div className="md:flex gap-2">
            <div className="md:flex shadow-lg md:p-10 gap-5     " >
                <div className="md:flex-1 flex justify-center">
                    <img className="w-[500px] h-[450px] max-sm:mb-5 rounded-2xl" src={mealImage} alt={title} />
                </div>

                <div className='md:flex-1 md:space-y-3'>
                    <h2 className="font-bold">Food Name: {title}</h2>
                    <h3 className="font-bold text-xl">Admin Name: {adminName}</h3>
                    <p><span className="font-bold">Description:</span> {description}</p>
                    <h3 className=""><span className="font-bold">Ingredients:</span> {ingredients}</h3>
                    <div className='flex justify-between'>
                        <h3 className="font-bold flex gap-2">Posting Time: {postTime}<IoIosTimer className="h-5 w-5" /></h3>
                    </div>
                    <div className="flex justify-between m-auto">
                        <p className="font-bold">Price: {price} $</p>
                        <div className=" flex items-center">
                            <p className="flex items-center gap-2">
                                <span className="font-bold text-xl">Rating:</span> {rating}
                            </p>
                            <FaStar className="text-yellow-500 ml-2" />
                        </div>
                    </div>
                    <p className="font-bold flex items-center gap-1">
                        <AiOutlineLike className="text-blue-500 h-10 w-10" />: {likes}
                    </p>
                    <p className="font-bold flex items-center gap-1">
                        <GoCodeReview className="text-blue-500 h-10 w-10" />:{reviews.length}
                    </p>

                    <div className="flex justify-between">
                        <Link to={-1}><button className="my-5 text-center px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-400 border hover:border-violet-500 text-white font-bold">Back</button></Link>
                        <button className="btn my-5 bg-blue-700 text-white " onClick={() => document.getElementById('my_modal_4').showModal()}>Review</button>

                        <dialog id="my_modal_4" className="modal">
                            <form onSubmit={handleSubmit(handleReviews)} className="modal-box w-11/12 max-w-5xl">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white">Reviews</span>
                                    </label>
                                    <textarea {...register('reviews')} className="textarea textarea-bordered h-24" placeholder="Write reviews here"></textarea>
                                </div>
                                <div className="modal-action">
                                    <button type="submit" className="btn bg-blue-800 text-white flex">Submit</button>
                                    <button type="button" onClick={() => document.getElementById('my_modal_4').close()} className="btn">Close</button>
                                </div>
                            </form>
                        </dialog>
                        <button onClick={handleAddToCart} className="my-5 text-center px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-400 border hover:border-violet-500 text-white font-bold">Request meal</button>
                        <button onClick={handleLike} className="my-5 text-center px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-400 border hover:border-violet-500 text-white font-bold flex items-center gap-2">
                            <AiOutlineLike className="w-5 h-5" /> Like: {likes}
                        </button>
                    </div>
                </div>
                
            </div>
            {/* suggest meals */}
            <div className="mt-10 ">
                <h2 className="text-2xl font-bold">You might also like</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-5">
                    {suggestedMeals.map(meal => (
                        <div key={meal._id} className="border rounded-lg shadow-lg p-4">
                            <img className="w-full h-32 rounded-t-lg object-cover" src={meal.mealImage} alt={meal.title} />
                            <h3 className="font-bold text-lg mt-2">{meal.title}</h3>
                            <p className="text-sm text-gray-600">Price: {meal.price} $</p>
                            <Link to={`/details/${meal._id}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
                        </div>
                    ))}
                </div>
            </div>
            </div>
            <div className="container mx-auto mt-10">
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    {reviews.length > 0 ? (
                        <div className="mt-4">
                            {reviews.map((review, index) => (
                                <div key={index} className="border-b py-2">
                                    <h4 className="font-bold">{review.reviewerName}</h4>
                                    <p>{review.review}</p>
                                    <span className="text-sm text-gray-500">{review.reviewTime}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews yet. Be the first to leave a review!</p>
                    )}
                </div>
           
           
            
        </div>
    );
};

export default Details;
