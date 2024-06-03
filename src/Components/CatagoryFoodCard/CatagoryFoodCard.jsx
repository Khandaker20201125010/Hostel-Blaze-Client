import { Link } from "react-router-dom";


const CatagoryFoodCard = ({item}) => {
     const {title,image,rating,price} = item
    return (
        <div className="shadow-lg p-4 flex flex-col group">
             <div className="flex justify-center mb-3">
                <img className="w-80 h-56 group-hover:scale-105" src={image} alt="" />
             </div>
             <div className="flex-grow space-y-2 font-bold">
                <p>{title}</p>
                <div>
                    <p>Rating:  {rating}</p>
                    <p>Price : {price}</p>
                </div>
                
             </div>
             <p className="border-b-2 border-blue-500 my-2"></p>
             <div className=" flex justify-center">
            <Link> <button className="bg-white border-r-4 border-b-4 border-blue-600 hover:bg-black px-4 py-2 rounded-md my-3 text-blue-500 font-bold">Details</button></Link>
             </div>
        </div>
    );
};

export default CatagoryFoodCard;