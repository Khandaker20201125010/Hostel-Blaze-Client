import { Link } from "react-router-dom";


const AllmealscardCollection = ({item}) => {
    const {image,distributorName,description,ingredients,postTime,rating,reviewerComment} =item
    return (
        <div className="shadow-lg p-4 flex flex-col group">
        <div className="flex justify-center mb-3">
           <img className="w-80 h-56 group-hover:scale-105" src={image} alt="" />
        </div>
        <div className="flex-grow space-y-2 font-bold">
           <p>Scholarship Name : {distributorName}</p>
           <p>University Name : {name}</p>
           <p>University Country : {description}</p>
           <p>Ingredients : {ingredients.join(", ")}</p>
           <div>
               <p>PostDate :  {postTime}</p>
             
           </div>
           <p>Degree : {rating}</p>
        </div>
        <p className="border-b-2 border-yellow-500 my-2"></p>
        <div className=" flex justify-center">
       <Link > <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md my-3 text-white font-bold">Details</button></Link>
        </div>
   </div>
    );
};

export default AllmealscardCollection;