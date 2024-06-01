import { Outlet } from "react-router-dom";
import Nav from "../Components/Navbar/Nav";


const Main = () => {
    return (
        <div className="">
            <Nav></Nav>
            <div className="">
            <Outlet></Outlet>
            </div>
            
            
        </div>
    );
};

export default Main;