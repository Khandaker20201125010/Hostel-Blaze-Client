import InfiniteScroll from "react-infinite-scroll-component";
import AllmealscardCollection from "../AllmealscardCollection/AllmealscardCollection";
import useMeals from "../Hooks/useMeals";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const Meals = () => {
    const [meals] = useMeals();
    const meal = useLoaderData();
    const [search, setSearch] = useState('');
    const [filteredMeals, setFilteredMeals] = useState(meals);

    useEffect(() => {
        setFilteredMeals(meals.filter(meal => meal.title.toLowerCase().includes(search.toLowerCase())));
    }, [search, meals]);

    const handleSearch = e => {
        e.preventDefault();
        const text = e.target.search.value;
        setSearch(text);
    };

    const [item, setItem] = useState(meal);
    const handleSort = (element) => {
        if (element === 'Ascending') {
            const asc = [...item].sort((x, y) => x.price - y.price);
            setItem(asc);
        } else if (element === 'Descending') {
            const des = [...item].sort((x, y) => y.price - x.price);
            setItem(des);
        }
    };

    return (
        <div>
            <div className="b1">
                <div className="bg-black/30 w-full text-center">
                    <h1 className="p-40 text-white text-6xl">Welcome to HostelBlaze Meals</h1>
                    <form onSubmit={handleSearch} className="my-5">
                        <div className="flex md:w-2/4 m-auto">
                            <input 
                                type="search" 
                                name="search" 
                                placeholder="Search" 
                                className="border-2 border-violet-950 rounded-l-md w-full px-4 py-2  mb-10" 
                            />
                            <input 
                                type="submit" 
                                value="Search" 
                                className="rounded-r-md bg-gradient-to-r from-violet-950 to-blue-900  text-white font-bold px-4 py-2 mb-10" 
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="my-5 flex justify-center items-center">
                <details className="dropdown">
                    <summary className="m-1 btn font-bold flex gap-2 justify-center items-center bg-gradient-to-r from-violet-950 to-blue-900 text-white ">
                        Select spot By<FaChevronDown />
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32">
                        <li onClick={() => handleSort('Ascending')} className="font-bold mb-3 text-center btn"> High Price </li>
                        <li onClick={() => handleSort('Descending')} className="font-bold mb-3 text-center btn"> Low Price </li>
                    </ul>
                </details>
            </div>
            <div>
                <InfiniteScroll
                    dataLength={filteredMeals.length}
                    hasMore={false}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="container m-auto min-h-screen grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 p-5">
                        {
                            filteredMeals.map(item => (
                                <AllmealscardCollection key={item._id} item={item} />
                            ))
                        }
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Meals;
