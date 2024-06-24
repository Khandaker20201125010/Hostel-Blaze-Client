import React from "react";
import { FaRegComment } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useUsers from "../Hooks/useUsers";
import useCountAxois from "../AxoisHook/useCountAxois";

const PaymentHistory = () => {
    const [users, refetch] = useUsers(); // Assuming useUsers returns users data
    const axiosSecure = useCountAxois(); // Assuming useCountAxois returns axios instance


    // Filter users who have price defined
    const usersWithPrice = users.filter(user => user.price !== undefined && user.price !== null);

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-6">Users List</h2>
            <div className="overflow-x-auto w-full">
                <div className="w-full">
                    {/* Link to navigate to all payment page */}
                    <Link to='/uDashboard/allPayment'>
                        <button className="btn bg-blue-900 text w-24 mb-5 mt-5">Pay</button>
                    </Link>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaction Id
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            transactionDate
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usersWithPrice.map((user, index) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.transactionId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                       {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                       {user.transactionDate}
                                    </span>
                                </td>
                           
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
