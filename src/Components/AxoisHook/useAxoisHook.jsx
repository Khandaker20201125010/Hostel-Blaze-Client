import axios from "axios";
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});
const UseAxoisHook = () => {
   
        return axiosSecure;

};

export default UseAxoisHook;
