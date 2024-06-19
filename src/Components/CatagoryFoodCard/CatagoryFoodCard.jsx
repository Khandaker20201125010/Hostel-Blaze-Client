import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const CatagoryFoodCard = ({ item }) => {
    const {_id, title,
        mealImage, rating, price, ingredients } = item
    return (
        <div className=" shadow-lg shadow-blue-800 p-4 flex flex-col group">
            <div className="flex justify-center mb-3">
                <img className="w-80 h-56 rounded-xl bg-opacity-30 group-hover:scale-105" src={
                    mealImage} alt="" />
                <p className=" absolute  ml-52 mt-5 font-bold text-white bg-black/40 rounded-xl px-4">{price}$</p>

            </div>

            <div className="flex-grow text-xl space-y-2 font-bold">
                <p>{title}</p>


            </div>
            <div className="ml-5 mt-5 flex items-center">
            <p className="flex items-center gap-2">
                <span className="font-bold text-xl">Rating:</span> {rating}
            </p>
            <FaStar className="text-yellow-500 ml-2" />
        </div>
            <p className="border-b-2 border-blue-500 my-2"></p>
            <div className=" flex justify-center">
                <Link to={`/details/${_id}`}  > <button className="bg-white border-r-4 border-b-4 border-blue-600 hover:bg-black px-4 py-2 rounded-md my-3 text-blue-500 font-bold">Details</button></Link>
            </div>
        </div>
    );
};

export default CatagoryFoodCard;