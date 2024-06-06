import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/Authprovider";

const ReqMeals = () => {
    const {user} = useContext(AuthContext);
    const reqFoods = useLoaderData()
    const borrowedFoods= reqFoods?.filter(item => item.buyersEmail=== user?.email && item?.borrowedFoods > 0)
    return (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10">
            {
                borrowedFoods?.map(food =><SingleOrder key={food._id} food={food}></SingleOrder>)
            }
          
        </div>
    );
};

export default ReqMeals;