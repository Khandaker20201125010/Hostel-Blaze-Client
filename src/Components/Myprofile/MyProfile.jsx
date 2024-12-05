// MyProfile.js
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../AxoisHook/userAxios";
import { AuthContext } from "../Providers/Authprovider";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    // const userAxios = axiosPublic();
    const users = useLoaderData()
    // const { data: users = [] } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await userAxios.get('/users');
    //         return res.data;
    //     }
    // });

    console.log(users);

 

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Helmet>
                <title>SM Profile</title>
            </Helmet>
            {
                user && (
                    <div data-aos="zoom-in-down" className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto border shadow-2xl p-5 rounded-lg my-20">
                        <div className="flex justify-center">
                            <img className="bg-red-100 w-52 h-52 rounded-full" referrerPolicy="no-referrer" src={user?.photoURL} alt="" />
                        </div>
                        <h2 className="md:text-2xl text-lg my-5 font-bold text-center">Name : {user?.name}</h2>
                        <p className="text-center mb-5">Email: {user?.email}</p>
                        <p className="text-center mb-5">Badge: {user?.badge}</p>
                    </div>
                )
            }
        </div>
    );
};

export default MyProfile;
