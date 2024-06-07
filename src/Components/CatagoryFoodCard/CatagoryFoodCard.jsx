import { Link } from "react-router-dom";


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
            <div className="mt-2">
            <p className=""><span className="text-bold text-xl">Ingredients:</span> {ingredients ? ingredients.join(', ') : 'No ingredients available'}</p>

            </div>
            <p className="border-b-2 border-blue-500 my-2"></p>
            <div className=" flex justify-center">
                <Link to={`/details/${_id}`}  > <button className="bg-white border-r-4 border-b-4 border-blue-600 hover:bg-black px-4 py-2 rounded-md my-3 text-blue-500 font-bold">Details</button></Link>
            </div>
        </div>
    );
};

export default CatagoryFoodCard;