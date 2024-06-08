
import { FaRegComment } from "react-icons/fa6";
import useMealQuary from "../useMeakQuary/useMealQuary";
import { SlLike } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import useCountAxois from "../AxoisHook/useCountAxois";
const RequestedMeals = () => {
    const [cart,refetch] = useMealQuary();
    const axiosSecure = useCountAxois();
    const handleCancle = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
           
            axiosSecure.delete(`/carts/${id}`)
            .then(res =>{
                if(res.data.deletedCount >0){
                    refetch();
                       Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
                    
                }
            })
            }
          });

      
        
    }
    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-6">Your Requested Meals</h2>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No
                            </th>
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
                            cart.map((item,index) => <tr key={item._id}>
                                <td  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                     {index}
                                </td>
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button onClick={()=>handleCancle (item._id)} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-red-600 hover:text-red-900">
                                    <MdCancel className="text-2xl" />
                                    </button>
                                </td>
                             
                            </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;
