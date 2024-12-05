import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Providers/Authprovider';
import useMeals from '../Hooks/useMeals';

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const users = useLoaderData()
    const [meals] =useMeals();
    const myMeals = meals?.filter(meal =>meal?.email === user?.email)
    console.log(myMeals)
   
    const loggedInUser = users?.find(userInfo => userInfo?.email === user?.email);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Helmet>
                <title>Admin Profile</title>
            </Helmet>
            {
                user && (
                    <div data-aos="zoom-in-down" className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto border shadow-2xl p-5 rounded-lg my-20">
                        <div className="flex justify-center">
                            <img className="bg-red-100 w-52 h-52 rounded-full" referrerPolicy="no-referrer" src={loggedInUser?.photoURL} alt="" />
                        </div>
                        <h2 className="md:text-2xl text-lg my-5 font-bold text-center">Name : {loggedInUser?.name}</h2>
                        <p className="text-center mb-5">Email: {loggedInUser?.email}</p>
                        <p className="text-center mb-5">Badge: {loggedInUser?.badge}</p>
                        <p className='text-center mb-5'>Total Meals  Added : {myMeals?.length}</p>
                    </div>
                )
            }
        </div>
    );
};

export default AdminProfile;