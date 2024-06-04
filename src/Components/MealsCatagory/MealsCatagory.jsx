import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import CatagoryFoodCard from '../CatagoryFoodCard/CatagoryFoodCard';
import useMeals from '../Hooks/useMeals';
import SectionTitle from '../SectionTitle/SectionTitle';

const MealsCatagory = () => {
    const [tabIndex, SetTabIndex] = useState(0)
    const [meals] = useMeals();
    const breakfast = meals.filter(item => item.category === 'Breakfast');
    const lunch = meals.filter(item => item.category === 'Lunch');
    const dinner = meals.filter(item => item.category === 'Dinner');


    return (
        <div className=''>
            <div>
                <SectionTitle   heading={"Fuel your day"} subHeading={"Here you can check out the Meals by Category and details to order the your meals"}>
                  
                </SectionTitle>
            </div>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => SetTabIndex(index)}>
            <TabList className="tab-list mt-20  w-full bg-black font-bold text-yellow-600">
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner </Tab>
                    <Tab>All Meals</Tab>
                </TabList>
                <TabPanel>
                    
                    <div data-aos="zoom-in-up" className='container m-auto grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-5 '>
                        {breakfast.map(item => <CatagoryFoodCard key={item._id} item={item}></CatagoryFoodCard>)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div data-aos="zoom-in" className='container  m-auto   grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-5'>
                        {lunch.map(item => <CatagoryFoodCard key={item._id} item={item}></CatagoryFoodCard>)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div data-aos="zoom-in-down" className='container  m-auto grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-5'>
                        {dinner.map(item => <CatagoryFoodCard key={item._id} item={item}></CatagoryFoodCard>)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div data-aos="zoom-out-up"  className='container  m-auto grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-5'>
                        {meals.map(item => <CatagoryFoodCard key={item._id} item={item}></CatagoryFoodCard>)}
                    </div>
                </TabPanel>

            </Tabs>

        </div>
    );
};

export default MealsCatagory;