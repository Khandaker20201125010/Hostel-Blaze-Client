import { useContext } from "react";
import { AuthContext } from "../Providers/Authprovider";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const SingleReqMeals = () => {
    const { user } = useContext(AuthContext)
    const Navigate = useNavigate()
    const { id } = useParams();
    const meals = useLoaderData();
    const details = meals?.find(item => item._id === id)
    const { _id, country, price, quantity, category, title,  mealImage, description,ingredients,time } = details
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    


    const updatedFoods = { _id, time:{year:year,month:month,day:day}, title, quantity: parseInt(quantity) - 1,description, price, category, adminName: user?.displayName, mealImage, isSold: true, buyersEmail: user?.email,ingredients };
    const handleUpdate = (_id) => {


        fetch(`https://resturant-management-server.vercel.app/restaurant/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedFoods)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Return Order successfully!",
                        icon: "success"
                    });
                }
                Navigate('/OrderedFood')
            })

    }
    return (
        <div>
        <div>

            <div className='shadow-lg p-5 rounded-md flex flex-col border'>

               
                <p className="font-bold">Date: {time?.day}/ {time?.month}/ {time?.year}</p>
                <div className='flex justify-center mb-4'>
                    <img className=' h-80 w-80 rounded-full' src={mealImage} alt="" />
                </div>
                <div className='flex-grow'>
                    <h2 className="font-bold">Food Name: {title}</h2>
                    <h2 className="font-bold">Food Category: {category}</h2>
                    <div className='flex justify-between'>
                        <h2 className="font-bold">Price: {price} $</h2>
                    

                    </div>
                </div>
                <button onClick={() => handleUpdate(_id)} className=" w-full my-5 text-center px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 border hover:border-red-500 text-white font-bold">Delete </button>
            </div>

        </div>

    </div>
    );
};

export default SingleReqMeals;