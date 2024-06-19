import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import MealsCatagory from "../MealsCatagory/MealsCatagory";
import MembershipCard from "../Memebershipcard/Memebershipcard";


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
            <MembershipCard></MembershipCard>
           
            
        </div>
    );
};

export default Home;