import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../AxoisHook/useAxiosSecure";
import { AuthContext } from "../Providers/Authprovider";

const EditReview = () => {
    const { id } = useParams(); // Assuming the meal ID is passed as a route parameter
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [meal, setMeal] = useState(null);
    const [userReview, setUserReview] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await axiosSecure.get(`/meals/${id}`);
                setMeal(response.data);

                const review = response.data.reviews.find(review => review.reviewerEmail === user.email);
                if (review) {
                    setUserReview(review.review);
                }
            } catch (error) {
                console.error("Failed to fetch meal", error);
            }
        };

        fetchMeal();
    }, [id, user.email, axiosSecure]);

    const handleReviewChange = (e) => {
        setUserReview(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedReviews = meal.reviews.map(review => 
            review.reviewerEmail === user.email ? { ...review, review: userReview } : review
        );

        const updatedMeal = { ...meal, reviews: updatedReviews };

        try {
            const response = await axiosSecure.patch(`/meals/reviews/${id}`, updatedMeal);

            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Review updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/uDashboard"); // Redirect to user dashboard or any other page
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to update review',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (!meal) return <div>Loading...</div>;

    return (
       <div className="">
         <div className="bg-gradient-to-r from-blue-950 to-slate-600  min-h-screen p-24">
             <div className="container m-auto bg-gradient-to-r from-slate-700 to-blue-600 hover:to-blue-800 p-10 item-center align-middle w-5/6">
            <h1 className="text-2xl font-bold mb-4">Edit Your Review for {meal.title}</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label htmlFor="review" className="block text-white">Your Review</label>
                    <textarea
                        id="review"
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                        value={userReview}
                        onChange={handleReviewChange}
                        rows="5"
                    />
                </div>
                <button type="submit" className="bg-gradient-to-r from-blue-950 to-slate-600 hover:to-blue-800 text-white px-4 py-2 rounded">Update Review</button>
            </form>
        </div>
        </div>
       </div>

    );
};

export default EditReview;
