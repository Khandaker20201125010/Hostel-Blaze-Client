import React from 'react';
import LeftFoodChart from './LeftFoodChart';
import RightFoodChart from './RightFoodChart';

const FoodChart = () => {
    return (
        <div className='min-h-screen p-40'>
            <LeftFoodChart></LeftFoodChart>
            <RightFoodChart></RightFoodChart>
            
        </div>
    );
};

export default FoodChart;