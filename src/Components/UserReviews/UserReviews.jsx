import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import useMeals from "../Hooks/useMeals";
import useAxiosSecure from "../AxoisHook/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/Authprovider";

const UserReviews = () => {
    const [meals,, refetch] = useMeals();
    const axiosSecure = useAxiosSecure();
    const [myReviews, setReviews] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {    
        const rev = meals?.filter(item =>
            item?.reviews?.find(review => review?.reviewerEmail === user?.email)
        );
        setReviews(rev);
    }, [meals, user.email]);

    const handleDeleteItem = async (item) => {
        // try {
            const updatedReviews = item.reviews.filter(review => review.reviewerEmail !== user.email);
            const updatedItem = { ...item, reviews: updatedReviews };

            const response = await axiosSecure.patch(`/meals/reviews/${item._id}`, updatedItem);

            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Review deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        // } catch (error) {
        //     Swal.fire({
        //         position: 'top-end',
        //         icon: 'error',
        //         title: 'Failed to delete review',
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // }
    };

    return (
        <div className="m-auto container mt-5">
            <SectionTitle heading="My Reviews" subHeading="Check"></SectionTitle>
            <div>
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
                            {myReviews?.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.likes}</td>
                                    <td>{(item?.reviews?.find(review => review?.reviewerEmail === user?.email))?.review}</td>
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
                                        <Link to={`/details/${item._id}`}>
                                            <button className="bg-white border-r-4 border-b-4 border-blue-600 hover:bg-black px-4 py-2 rounded-md my-3 text-blue-500 font-bold">View</button>
                                        </Link>
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
