import Swal from "sweetalert2";
import useMeals from "../Hooks/useMeals";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import useAxiosSecure from "../AxoisHook/useAxiosSecure";


const AdminAllReviews = () => {
    const [meals,, refetch] = useMeals();
    const axiosSecure = useAxiosSecure();
   


    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/meals/${item._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };
    

    return (
        <div className="m-auto container ml-10">
            <SectionTitle heading="Manage All Items" subHeading="Hurry up"></SectionTitle>
            <div>
           
                
                <div className="overflow-x-auto">
                    <table className="table table-auto w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Meal Name</th>
                                <th>Reviews</th>
                                <th>Likes</th>
                               
                                <th>Details</th>
                               
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.mealImage} alt="Meal" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.title}</td>
                                   
                                    <td>{item.reviews ? item.reviews.length : 0}</td>
                                    <td>{item.likes}</td>
                                   
                                    <td>

                                        <Link to={`/details/${item._id}`} > <button className="bg-white border-r-4 border-b-4 border-blue-600 hover:bg-black px-4 py-2 rounded-md my-3 text-blue-500 font-bold">View meal</button></Link>

                                    </td>
                                   
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAllReviews;
