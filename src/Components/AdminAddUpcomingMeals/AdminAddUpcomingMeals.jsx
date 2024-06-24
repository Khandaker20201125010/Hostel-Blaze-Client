import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import SectionTitle from '../SectionTitle/SectionTitle';
import userAxiosPublic from '../AxoisHook/userAxiosPublic';
import useAxiosSecure from '../AxoisHook/useAxiosSecure';
import Swal from 'sweetalert2';
import useUpComingMeals from '../Hooks/useUpComingMeals';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AdminAddUpcomingMeals = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = userAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [upComingMeals, loading, refetch] = useUpComingMeals();
    const [sortBy, setSortBy] = useState("");

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const menuItem = {
                title: data.name,
                category: data.category,
                price: parseFloat(data.price),
                mealImage: res.data.data.display_url,
                ingredients: data.ingredients,
                description: data.description,
                postTime: moment().format("MMM Do YY"),
                likes: parseInt(data.likes),
                reviews: [data.reviews],
                adminName: data.adminName,
                email: data.email,
                rating: parseInt(data.rating),
                likers: [data.likers],
                distributorName: "Hostale Distributors"
            };

            const menuRes = await axiosSecure.post('/upComingMeals', menuItem);

            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the Meals.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };
    const handleSortByChange = (criteria) => {
        setSortBy(criteria);
    };

    const sortedMeals = () => {
        switch (sortBy) {
            case "likes":
                return [...upComingMeals].sort((a, b) => b.likes - a.likes);

            default:
                return upComingMeals;
        }
    };
   
    const handlePublish = async (mealId) => {
        try {
            const mealToPublish = upComingMeals.find(meal => meal._id === mealId);

            // Add the meal to mealsCollection
            const publishRes = await axiosSecure.post('/mealsCollection', mealToPublish);

            if (publishRes.data.insertedId) {
                // Remove the meal from upComingMeals
                const removeRes = await axiosSecure.delete(`/upComingMeals/${mealId}`);

                if (removeRes.data.deletedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${mealToPublish.title} has been published.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch(); // Refresh the list of upcoming meals
                }
            }
        } catch (error) {
            console.error("Error publishing meal:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to publish the meal.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };


    return (
        <div className='min-h-screen w-5/6 m-auto mt-10 bg-gradient-to-r from-black to-blue-900 hover:bg-blue-800 p-5 '>
            <Helmet>
                <title>Add Upcoming Meals</title>
            </Helmet>
            <SectionTitle heading="Add Meals" subHeading="What's New?" />
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div>
                <div className="my-5 flex justify-center items-center">
                    <details className="dropdown">
                        <summary className="m-1 text-white btn font-bold flex gap-2 justify-center items-center bg-gradient-to-r from-violet-950 to-blue-900 ">
                            Select sort By<FaChevronDown />
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32">
                            <li className="font-bold mb-3 text-center btn" onClick={() => handleSortByChange("likes")}>Likes</li>
                            <li className="font-bold mb-3 text-center btn" onClick={() => handleSortByChange("")}>Default Price</li>


                        </ul>
                    </details>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-auto w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Meal Name</th>
                                <th>Likes</th>
                                <th>Price</th>
                                <th>Publish</th>
                                <td> <div>
                                        <button className="btn  bg-violet-800" onClick={() => document.getElementById('my_modal_1').showModal()}>Add UpComing Meals</button>
                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
                                                <div>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="form-control w-full my-6">
                                                            <label className="label">
                                                                <span className="label-text text-white">Food Name*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="Food Name"
                                                                {...register('name', { required: true })}
                                                                required
                                                                className="input input-bordered w-full"
                                                            />
                                                        </div>
                                                        <div className="flex gap-6">
                                                            {/* Category */}
                                                            <div className="form-control w-full my-6">
                                                                <label className="label">
                                                                    <span className="label-text text-white">Category*</span>
                                                                </label>
                                                                <select defaultValue="default" {...register('category', { required: true })} className="select select-bordered w-full">
                                                                    <option disabled value="default">Select a Category</option>
                                                                    <option value="Breakfast">Breakfast</option>
                                                                    <option value="Lunch">Lunch</option>
                                                                    <option value="Dinner">Dinner</option>
                                                                </select>
                                                            </div>
                                                            {/* Price */}
                                                            <div className="form-control w-full my-6">
                                                                <label className="label">
                                                                    <span className="label-text text-white">Price*</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    placeholder="Price"
                                                                    {...register('price', { required: true })}
                                                                    className="input input-bordered w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* Recipe Details */}
                                                        <div className="gap-5 flex">
                                                            <div className="form-control w-full  my-6">
                                                                <label className="label">
                                                                    <span className="label-text text-white">Likes</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    placeholder="Likes"
                                                                    {...register('likes', { required: true })}
                                                                    className="input input-bordered w-full"
                                                                />
                                                            </div>
                                                            <div className="form-control w-full  my-6">
                                                                <label className="label">
                                                                    <span className="label-text text-white">Rating</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    step="0.1"
                                                                    placeholder="Rating"
                                                                    {...register('rating', { required: true })}
                                                                    className="input input-bordered w-full"
                                                                />
                                                            </div>

                                                        </div>
                                                        {/* Ingredients */}
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text text-white">Ingredients</span>
                                                            </label>
                                                            <textarea {...register('ingredients')} className="textarea textarea-bordered h-24" placeholder="Ingredients"></textarea>
                                                        </div>
                                                        {/* Description */}
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text text-white">Description</span>
                                                            </label>
                                                            <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text text-white">Reviews</span>
                                                            </label>
                                                            <textarea {...register('reviews')} className="textarea textarea-bordered h-24" placeholder="Reviews"></textarea>
                                                        </div>
                                                        <div className="flex gap-6">
                                                            {/* Admin Name */}
                                                            <div className="form-control w-full my-6">
                                                                <label className="label">
                                                                    <span className="label-text text-white">Admin Name*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Admin Name"
                                                                    {...register('adminName', { required: true })}
                                                                    className="input input-bordered w-full"
                                                                />
                                                            </div>
                                                            {/* Email */}
                                                            <div className="form-control w-full my-6">
                                                                <label className="label">
                                                                    <span className="label-text text-white">Email*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Email"
                                                                    {...register('email', { required: true })}
                                                                    className="input input-bordered w-full"
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="flex gap-6">
                                                            {/* Likes */}

                                                            {/* Upload Image */}
                                                            <div className="form-control w-full my-6 ">
                                                                <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                                                            </div>
                                                        </div>
                                                        {/* Submit Button */}
                                                        <button type="submit" className="btn text-white bg-gradient-to-r from-black to-blue-900 hover:bg-blue-800 p-5">Add Meals    </button>
                                                    </form>
                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div></td>
                                    <td></td>

                            </tr>
                        </thead>
                        <tbody>
                            {sortedMeals().map((item, index) => (
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
                                    <td>d</td>
                                    <td>{item.title}</td>
                                    <td>{item.likes}</td>
                                    <td>${item.price}</td>
                                    <button className='btn bg-green-600' onClick={() => handlePublish(item._id)}>Publish</button>
                                    

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    );
};

export default AdminAddUpcomingMeals;