import InfiniteScroll from "react-infinite-scroll-component";


import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import useUpComingMeals from "../Hooks/useUpComingMeals";
import UpcomingmealsCollection from "../upcomingmealscollection/UpcomingmealsCollection";

const UpcomingMealss = () => {
    const [upComingMeals] = useUpComingMeals();
    const upComingMeal = useLoaderData();
    const [search, setSearch] = useState('');
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [originalMeals, setOriginalMeals] = useState([]);
    const [, setItem] = useState([]);
    

    useEffect(() => {
        setFilteredMeals(upComingMeals.filter(upComingMeal => upComingMeal.title && upComingMeal.title.toLowerCase().includes(search.toLowerCase())));
    }, [search, upComingMeals]);
    
    useEffect(() => {
        console.log("Meal object:", upComingMeal); // Add this line to see the meal object
        const sortedMeals = [...upComingMeal].sort((x, y) => x.price - y.price); // Sort by ascending price initially
        setOriginalMeals(upComingMeal); // Store the original order of meals
        setFilteredMeals(sortedMeals);
        setItem(sortedMeals);
    }, [upComingMeal]);
    

    // const handleSearch = e => {
    //     e.preventDefault();
    //     const text = e.target.search.value;

    //     setSearch(text);
    // };
    const handleSearch = e => {
        e.preventDefault();
        const text = e.target.search.value; // This line is causing the error
    
        setSearch(text);
    };
    

    const handleSort = (element) => {
        if (element === 'Ascending') {
            const asc = [...filteredMeals].sort((x, y) => x.price - y.price);
            setFilteredMeals(asc);
        } else if (element === 'Descending') {
            const des = [...filteredMeals].sort((x, y) => y.price - x.price);
            setFilteredMeals(des);
        } else if (element === 'Default') {
            setFilteredMeals(originalMeals); // Restore the original order
        }
    };

    return (
        <div>
            <div className="b1">
                <div className="bg-black/30 w-full text-center">
                    <h1 className="md:p-40 p-10 text-white text-6xl">Upcoming Meals</h1>
                    <form onSubmit={handleSearch} className="my-5">
                        <div className="flex md:w-2/4 m-auto">
                            <input
                                type="search"
                                name="search"  // Make sure the name attribute is "search"
                                placeholder="Search"
                                className="border-2 border-violet-950 rounded-l-md w-full px-4 py-2 mb-10  "
                            />
                            <input
                                type="submit"
                                value="Search"
                                className="rounded-r-md bg-gradient-to-r from-violet-950 to-blue-900 text-white font-bold px-4 py-2 mb-10"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="my-5 flex justify-center items-center">
                <details className="dropdown">
                    <summary className="m-1 text-white btn font-bold flex gap-2 justify-center items-center bg-gradient-to-r from-violet-950 to-blue-900 ">
                        Select sort By<FaChevronDown />
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32">
                        <li onClick={() => handleSort('Ascending')} className="font-bold mb-3 text-center btn"> Low Price </li>
                        <li onClick={() => handleSort('Descending')} className="font-bold mb-3 text-center btn"> High Price </li>
                        <li onClick={() => handleSort('Default')} className="font-bold mb-3 text-center btn"> Default Price </li>
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
                                <UpcomingmealsCollection  key={item._id} item={item}></UpcomingmealsCollection>
                            ))
                        }
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default UpcomingMealss;