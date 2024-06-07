
import { FaRegComment } from "react-icons/fa6";
import useMealQuary from "../useMeakQuary/useMealQuary";
import { SlLike } from "react-icons/sl";
const RequestedMeals = () => {
    const [cart] = useMealQuary()
    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-6">Your Requested Meals</h2>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Meal
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Likes
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Reviews
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            cart.map(item => <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                   <img className="w-20 h-20 rounded-full" src={item.mealImage} alt="" /> 
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                    <SlLike />
                                        <span>125</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <FaRegComment />
                                        <span>42</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Available
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-red-600 hover:text-red-900">

                                        <span className="sr-only">Cancel</span>
                                    </button>
                                </td>
                            </tr>)
                        }
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Grilled Chicken Salad
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">

                                    <span>125</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <FaRegComment />
                                    <span>42</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Available
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-red-600 hover:text-red-900">

                                    <span className="sr-only">Cancel</span>
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;
