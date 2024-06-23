import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";

const AllmealscardCollection = ({ item }) => {
    const {
        _id, title, mealImage, distributorName, description, ingredients, postTime, rating, reviewerComment, price } = item
    return (
        <div className="shadow-lg rounded-xl shadow-sky-800 p-4 flex flex-col group animate__animated animate__bounceIn">
            <div className="flex justify-center mb-3">
                <img className="w-80 h-80 group-hover:scale-105 rounded-full" src={mealImage} alt="" />
            </div>
            <div className="flex-grow space-y-2 font-bold">
                <p>{title}</p>
                <p>Description: {description}</p>
                <div className="flex justify-between">
                    <p>Price :  {price}$</p>
                    <p>Post Time:{postTime}</p>

                </div>
                <p className="flex gap-2">Rating : {rating} <IoStar className="text-xl text-yellow-500" /></p>
            </div>
            <p className="border-b-2 border-blue-500 my-2"></p>
            <div className=" flex justify-center">
                <Link to={`/details/${_id}`} > <button className="bg-white border-r-4 border-b-4 border-blue-600 hover:bg-black px-4 py-2 rounded-md my-3 text-blue-500 font-bold">Details</button></Link>
            </div>
        </div>
    );
};

export default AllmealscardCollection;