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
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                mealImage: res.data.data.display_url,
                ingredients: data.ingredients,
                description: data.description,
                postTime: moment().format("MMM Do YY"),
                likes: 0,
                reviews: [],
                adminName: data.adminName,
                email: data.email
            };

            const menuRes = await axiosSecure.post('/meals', menuItem);
            
            if(menuRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div>
            <SectionTitle heading="Add an Item" subHeading="What's New?" />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    {/* Add more form fields for category, price, recipe details, ingredients, description, etc. */}
                    {/* Category */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Category*</span>
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
                            <span className="label-text">Price*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Price"
                            {...register('price', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    {/* Recipe Details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    </div>
                    {/* Ingredients */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Ingredients</span>
                        </label>
                        <textarea {...register('ingredients')} className="textarea textarea-bordered h-24" placeholder="Ingredients"></textarea>
                    </div>
                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                    </div>
                    {/* Admin Name */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Admin Name*</span>
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
                            <span className="label-text">Email*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    {/* Upload Image */}
                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    {/* Submit Button */}
                    <button type="submit" className="btn">Add Item</button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;
