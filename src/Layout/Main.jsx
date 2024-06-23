import { Outlet } from "react-router-dom";
import Nav from "../Components/Navbar/Nav";
import Footer from "../Components/Footer/Footer";


const Main = () => {
    return (
        <div className="">
            <Nav></Nav>
            <div className="">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
            
        </div>
    );
};

export default Main;