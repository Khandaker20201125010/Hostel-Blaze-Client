
import Swal from "sweetalert2";
import { FaChevronDown, FaEdit,  FaTrashAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import useMeals from "../Hooks/useMeals";
import useAxiosSecure from "../AxoisHook/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/Authprovider";



const UserReviews = () => {
    const [meals, refetch] = useMeals();
    const axiosSecure = useAxiosSecure();
    const [sortBy, setSortBy] = useState("");
    const [myReviews,setReviews] = useState([]);
    const {user} = useContext(AuthContext);




    const rev = meals?.filter(item =>
        item?.reviews?.find(item =>item?.reviewerEmail === user?.email)
        
    )
    console.log(rev)
    

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

    const handleSortByChange = (criteria) => {
        setSortBy(criteria);
    };

    const sortedMeals = () => {
        switch (sortBy) {
            case "likes":
                return [...meals].sort((a, b) => b.likes - a.likes);
            case "reviews":
                return [...meals].sort((a, b) => (a.reviews ? a.reviews.length : 0) - (b.reviews ? b.reviews.length : 0));
            default:
                return meals;
        }
    };

    return (
        <div className="m-auto container ">
            <SectionTitle heading="Manage All Items" subHeading="Hurry up"></SectionTitle>
            <div>
                <div className="my-5 flex justify-center items-center">
                    <details className="dropdown">
                        <summary className="m-1 text-white btn font-bold flex gap-2 justify-center items-center bg-gradient-to-r from-violet-950 to-blue-900 ">
                            Select sort By<FaChevronDown />
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32">
                            <li className="font-bold mb-3 text-center btn" onClick={() => handleSortByChange("likes")}>Likes</li>
                            <li className="font-bold mb-3 text-center btn" onClick={() => handleSortByChange("reviews")}>Reviews</li>
                            <li className="font-bold mb-3 text-center btn" onClick={() => handleSortByChange("")}>Default Price</li>
                        </ul>
                    </details>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-auto w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Meal Name</th>
                                <th>Likes</th>
                                <th>Reviews</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                 <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMeals().map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.likes}</td>
                                    <td>{item.reviews ? item.reviews.length : 0}</td>
                                   
                                    
                                    <td>
                                        <Link to={`/uDashboard/updateItem/${item._id}`}>
                                            <button className="btn btn-ghost btn-lg bg-blue-500">
                                                <FaEdit className="text-white"></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                    <td>

                                        <Link to={`/details/${item._id}`} > <button className="bg-white border-r-4 border-b-4 border-blue-600 hover:bg-black px-4 py-2 rounded-md my-3 text-blue-500 font-bold">View</button></Link>

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


export default UserReviews;