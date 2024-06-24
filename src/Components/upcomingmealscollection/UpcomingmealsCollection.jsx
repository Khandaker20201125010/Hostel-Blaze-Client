import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../AxoisHook/useAxiosSecure';
import { AuthContext } from '../Providers/Authprovider';
import { AiOutlineLike } from 'react-icons/ai';
import useLikeQuary from '../useMeakQuary/useLikeQuary'; // Assuming this is the correct path

const UpcomingmealsCollection = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { _id, likes, likers, title, mealImage } = item;
  const [, , refetch] = useLikeQuary(); // Destructuring the refetch function from custom hook

  const handleLike = async () => {
    if (likers.includes(user.email)) return;

    const updatedDetails = { ...item, likers: [...likers, user.email], likes: likes + 1 };

    try {
      const response = await axiosSecure.patch(`/upComingMeals/like/${_id}`, updatedDetails);
      refetch(); // Calling refetch after successful like operation

      if (response.data.likes >= 10) {
        toast.success('Meal moved to main collection!', {
          position: 'top-end',
          autoClose: 1500,
        });
      } else {
        toast.success('You liked the meal!', {
          position: 'top-end',
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error('Error liking meal:', error);
      toast.error('Failed to like the meal. Please try again later.');
    }
  };

  return (
    <div className="shadow-lg rounded-xl shadow-sky-800 p-4 flex flex-col group animate__animated animate__bounceIn">
      <div className="flex justify-center mb-3">
        <img className="w-80 h-80 group-hover:scale-105" src={mealImage} alt="" />
      </div>
      <h1 className="p-12 text-center flex justify-center font-bold text-4xl">Coming soon</h1>
      <button
        onClick={handleLike}
        className="my-5 text-center px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-400 border hover:border-violet-500 text-white font-bold flex items-center gap-2"
      >
        <AiOutlineLike className="w-5 h-5" /> Like: {likes}
      </button>
    </div>
  );
};

export default UpcomingmealsCollection;
