import { useState } from 'react';
import LeftFoodChart from './LeftFoodChart';
import RightFoodChart from './RightFoodChart';

const FoodChart = () => {
    // State to track the active chart
    const [activeChart, setActiveChart] = useState('left'); // 'left' or 'right'

    return (
        <div className='min-h-screen md:p-40'>
            {/* Buttons to toggle between charts */}
            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 m-2 rounded ${activeChart === 'left' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveChart('left')}
                >
                    Rating Chart
                </button>
                <button
                    className={`px-4 py-2 m-2 rounded ${activeChart === 'right' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveChart('right')}
                >
                   Available Meal Chart
                </button>
            </div>

            {/* Conditional rendering of charts based on active state */}
            {activeChart === 'left' ? <LeftFoodChart /> : <RightFoodChart />}
        </div>
    );
};

export default FoodChart;
