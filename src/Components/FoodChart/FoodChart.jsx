import { useState } from "react";
import LeftFoodChart from "./LeftFoodChart";
import RightFoodChart from "./RightFoodChart";
import chef from "../../assets/images/chef-with-smile-white-uniform-showing-thumb-up-as-cartoon-illustration_3442-1932-removebg-preview.png";

const FoodChart = () => {
  // State to track the active chart
  const [activeChart, setActiveChart] = useState("left"); // 'left' or 'right'

  return (
    <div className="">
      <div className="c1">
        <h1 className="rounded-xl text-center m-auto bg-black/30 p-10 text-6xl text-white font-bold flex justify-center sm:flex-cols-1 sm:flex ">
          Check Our chart
        </h1>
        <img
          className="lg:h-96 lg:ml-20 md:absolute lg:w-72 md:mt-64 absolute h-32 container w-32 max-sm:mt-72 max-sm:ml-10"
          src={chef}
          alt=""
        />
      </div>

      <div className="min-h-screen md:p-40">
        {/* Buttons to toggle between charts */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 m-2 rounded ${
              activeChart === "left"
                ? "bg-blue-500 text-white hover:shadow-2xl hover:shadow-blue-500"
                : "bg-gray-200 hover:shadow-2xl hover:shadow-blue-500"
            }`}
            onClick={() => setActiveChart("left")}
          >
            Rating Chart
          </button>
          <button
            className={`px-4 py-2 m-2 rounded ${
              activeChart === "right"
                ? "bg-blue-500 text-white hover:shadow-2xl hover:shadow-blue-500"
                : "bg-gray-200 hover:shadow-2xl hover:shadow-blue-500"
            }`}
            onClick={() => setActiveChart("right")}
          >
            Available Meal Chart
          </button>
        </div>

        {/* Conditional rendering of charts based on active state */}
        {activeChart === "left" ? <LeftFoodChart /> : <RightFoodChart />}
      </div>
    </div>
  );
};

export default FoodChart;
