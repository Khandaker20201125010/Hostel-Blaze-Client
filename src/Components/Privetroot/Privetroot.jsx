import {useContext} from "react";
import {AuthContext} from "../Providers/Authprovider";
import { Navigate, useLocation } from "react-router-dom";


const Privetroot = ({children}) => {
      const {user,loading} = useContext(AuthContext);
      const location = useLocation();
      console.log(location.pathname)
     if(loading) {
        return  <span className="loading loading-bars loading-lg items-center"></span>
     }
      if(user){
        return  children;
      }
    return <Navigate state={location.pathname} to="/Login"></Navigate>;
};

export default Privetroot;