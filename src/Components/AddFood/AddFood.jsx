import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import SectionTitle from '../SectionTitle/SectionTitle';
import userAxiosPublic from '../AxoisHook/userAxiosPublic';
import useAxiosSecure from '../AxoisHook/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddFood = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = userAxiosPublic();
    const axiosSecure = useAxiosSecure();
    
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
                reviews:[data.reviews],
                adminName: data.adminName,
                email: data.email,
                distributorName: "Hostale Distributors" 
            };

            const menuRes = await axiosSecure.post('/meals', menuItem);
            
            if(menuRes.data.insertedId){
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

    return (
        <div className='min-h-screen w-5/6 m-auto mt-10 bg-gradient-to-r from-black to-blue-900 hover:bg-blue-800 p-5 '>
            <Helmet>
                <title>Add Food</title>
            </Helmet>
            <SectionTitle heading="Add Meals" subHeading="What's New?" />
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
                                <span className="label-text">Rating</span>
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
        </div>
    );
};

export default AddFood;
