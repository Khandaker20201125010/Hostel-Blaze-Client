import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Components/Navbar/Nav";
import Footer from "../Components/Footer/Footer";


const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('Login') || location.pathname.includes('signUp') 
    return (
        <div className="">
           {noHeaderFooter || <Nav></Nav>}
            <div className="">
            <Outlet></Outlet>
            </div>
           {noHeaderFooter || <Footer></Footer>}
            
            
        </div>
    );
};

export default Main;