import AllmealscardCollection from "../AllmealscardCollection/AllmealscardCollection";
import useMeals from "../Hooks/useMeals";

const Meals = () => {
    const [meals] =useMeals();
    
    return (
        <div>
            {
                meals.map(item =><AllmealscardCollection key={item._id} item={item}></AllmealscardCollection> )
            }
        </div>
    );
};

export default Meals;