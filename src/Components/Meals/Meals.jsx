import AllmealscardCollection from "../AllmealscardCollection/AllmealscardCollection";
import useMeals from "../Hooks/useMeals";

const Meals = () => {
    const [meals] =useMeals();
    
    return (
        <div className=" min-h-screen grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-5 ">
            {
                meals.map(item =><AllmealscardCollection key={item._id} item={item}></AllmealscardCollection> )
            }
        </div>
    );
};

export default Meals;