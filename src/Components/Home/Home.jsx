import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import MealsCatagory from "../MealsCatagory/MealsCatagory";
import Membership from "../Memebershipcard/Membership";
import Opentime from "../Opentime/Opentime";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <div className="mt-36 text-center">
            <MealsCatagory></MealsCatagory>
            </div>
            <Membership></Membership>
            <Opentime></Opentime>
           
            
        </div>
    );
};

export default Home;