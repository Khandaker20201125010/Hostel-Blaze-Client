import { NavLink, Outlet } from "react-router-dom";
import { MdNoMealsOuline, MdPayment, MdRateReview } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import useAdmin from "../AxoisHook/useAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin()
    return (
        <div className="flex" >
            <div className="ml-20 w-64 min-h-screen bg-gradient-to-r from-violet-950 to-blue-900 ">

                {
                    isAdmin ? <>
                        <h1 className="text-center text-2xl text-white font-bold mt-5">Admin Home</h1>
                        <ul className="text-white font-semibold">
                            <li className="flex p-4 gap-2" >
                                <CgProfile className="text-2xl" />
                                <NavLink to='/uDashboard/adminProfile'>Admin Profile</NavLink></li>
                            <li className="flex p-4 gap-2">
                                <MdManageAccounts className="text-2xl" />
                                <NavLink to='/uDashboard/manageUsers'>Manage Users</NavLink></li>
                            <li className="flex p-4 gap-2">
                                <IoIosAddCircle className="text-2xl" /><NavLink to='/uDashboard/addMeals'>Add Meals</NavLink></li>
                            <li className="flex p-4 gap-2">
                                <MdNoMealsOuline className="text-2xl" />
                                <NavLink to='/uDashboard/allMeals'>All Meals</NavLink>
                            </li>
                            <li className="flex p-4 gap-2">
                                <MdPayment className="text-2xl" />
                                <NavLink to='/uDashboard/allReviews'>All Reviews</NavLink>
                            </li>
                            <li className="flex p-4 gap-2">
                                <MdNoMealsOuline className="text-2xl" />
                                <NavLink to='/uDashboard/serveMeals'>Serve Meals</NavLink>
                            </li>
                            <li className="flex p-4 gap-2">
                                <MdNoMealsOuline className="text-2xl" />
                                <NavLink to='/uDashboard/addUpcomingMeals'>Upcoming Meals</NavLink>
                            </li>

                        </ul>

                    </>
                        :
                        <>
                            <h1 className="text-center text-2xl text-white font-bold mt-5">User Home</h1>
                            <ul className="text-white font-semibold">
                                <li className="flex p-4 gap-2" >
                                    <CgProfile className="text-2xl" />
                                    <NavLink to='/uDashboard/myProfile'>My Profile</NavLink></li>
                                <li className="flex p-4 gap-2">
                                    <MdNoMealsOuline className="text-2xl" />
                                    <NavLink to='/uDashboard/requestedMeals'>Requested Meals</NavLink></li>
                                <li className="flex p-4 gap-2">
                                    <MdRateReview className="text-2xl" /><NavLink to='/uDashboard/myReviews'>My Reviews</NavLink></li>
                                <li className="flex p-4 gap-2">
                                    <MdPayment className="text-2xl" />
                                    <NavLink to='/uDashboard/paymentHistory'>Payment History</NavLink>
                                </li>

                            </ul>
                        </>
                }
                <div className="divider bg-white h-1"></div>
                <li className="flex p-4 gap-2 text-white">
                    <IoMdHome className="text-2xl" />
                    <NavLink to='/'>Home</NavLink>
                </li> <li className="flex p-4 gap-2 text-white">
                    <MdNoMealsOuline className="text-2xl" />
                    <NavLink to='/meals'>Meals</NavLink>
                </li>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>


        </div>
    );
};

export default Dashboard;