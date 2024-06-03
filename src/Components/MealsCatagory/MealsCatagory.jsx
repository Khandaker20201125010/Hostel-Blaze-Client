import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMeals from '../Hooks/useMeals';
import CatagoryFoodCard from '../CatagoryFoodCard/CatagoryFoodCard';

const MealsCatagory = () => {
    const [tabIndex,SetTabIndex] = useState(0)
    const [meals] = useMeals();
    const Breakfast = meals.filter(item => item.catagory === 'Breakfast')
    const Lunch = meals.filter(item => item.catagory === 'Lunch')
    const Dinner = meals.filter(item => item.catagory === 'Dinner')
    
    
    return (
        <div>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => SetTabIndex(index)}>
                <TabList>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                    <Tab>All Meals</Tab>
                </TabList>
                <TabPanel>
                    {
                        Breakfast.map(item => <CatagoryFoodCard key={item._id} item={item}></CatagoryFoodCard>)
                    }  
                </TabPanel>
                <TabPanel>

                </TabPanel>
                <TabPanel>

                </TabPanel>
                <TabPanel>

                </TabPanel>
            </Tabs>

        </div>
    );
};

export default MealsCatagory;