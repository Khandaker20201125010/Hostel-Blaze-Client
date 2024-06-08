import { useQuery } from "@tanstack/react-query";
import useCountAxois from "../AxoisHook/useCountAxois";


const ManageUsers = () => {
    const axiosSecure = useCountAxois();
    const{data:users =[]} = useQuery({
        queryKey:['users'],
        queryFn: async () =>{
             const res = await  axiosSecure.get ('/users')
             return res.data;
        }

    });
    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold ">Total User: {users.length}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left">No</th>
              <th className="py-3 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left">Username</th>
              <th className="py-3 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left">Email</th>
              <th className="py-3 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left">Subscription Status</th>
              <th className="py-3 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
          
           {
            users.map((user,index) => <tr key={user._id} >
                <td className="py-3 px-4 border-b border-gray-200">{index+1}</td>
                <td className="py-3 px-4 border-b border-gray-200">{user.name}</td>
                <td className="py-3 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-3 px-4 border-b border-gray-200">{user.Status}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    
                  >
                    Make Admin
                  </button>
                </td>
              </tr>)
           }
           
          </tbody>
        </table>
      </div>
    </div>
            
        </div>
    );
};

export default ManageUsers;