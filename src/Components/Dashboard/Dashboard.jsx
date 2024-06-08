import { NavLink, Outlet } from "react-router-dom";
import { MdNoMealsOuline, MdPayment, MdRateReview } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";

const Dashboard = () => {
    const isAdmin = true;
    return (
        <div className="flex">
            <div className="ml-20 w-64 min-h-screen bg-gradient-to-r from-violet-950 to-blue-900 ">
                <h1 className="text-center text-3xl text-white font-bold mt-5">Admin Home</h1>
                {
                    isAdmin ? <>
                        <ul className="text-white font-semibold">
                            <li className="flex p-4 gap-2" >
                                <CgProfile className="text-2xl" />
                                <NavLink to='uDashboard/myProfile'>Admin Profile</NavLink></li>
                            <li className="flex p-4 gap-2">
                                <MdManageAccounts className="text-2xl" />
                                <NavLink to='uDashboard/manageUsers'>Manage Users</NavLink></li>
                            <li className="flex p-4 gap-2">
                                <IoIosAddCircle className="text-2xl" /><NavLink to='uDashboard/myReviews'>Add Meal</NavLink></li>
                            <li className="flex p-4 gap-2">
                                <MdNoMealsOuline className="text-2xl" />
                                <NavLink to='uDashboard/paymentHistory'>All Meals</NavLink>
                            </li>
                            <li className="flex p-4 gap-2">
                                <MdPayment className="text-2xl" />
                                <NavLink to='uDashboard/paymentHistory'>All Reviews</NavLink>
                            </li>
                            <li className="flex p-4 gap-2">
                                <MdNoMealsOuline className="text-2xl" />
                                <NavLink to='uDashboard/paymentHistory'>Serve Meals</NavLink>
                            </li>
                            <li className="flex p-4 gap-2">
                                <MdNoMealsOuline className="text-2xl" />
                                <NavLink to='uDashboard/paymentHistory'>Upcoming Meals</NavLink>
                            </li>

                        </ul>

                    </>
                        :
                        <>
                            <ul className="text-white font-semibold">
                                <li className="flex p-4 gap-2" >
                                    <CgProfile className="text-2xl" />
                                    <NavLink to='uDashboard/myProfile'>My Profile</NavLink></li>
                                <li className="flex p-4 gap-2">
                                    <MdNoMealsOuline className="text-2xl" />
                                    <NavLink to='uDashboard/requestedMeals'>Requested Meals</NavLink></li>
                                <li className="flex p-4 gap-2">
                                    <MdRateReview className="text-2xl" /><NavLink to='uDashboard/myReviews'>My Reviews</NavLink></li>
                                <li className="flex p-4 gap-2">
                                    <MdPayment className="text-2xl" />
                                    <NavLink to='uDashboard/paymentHistory'>Payment History</NavLink>
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