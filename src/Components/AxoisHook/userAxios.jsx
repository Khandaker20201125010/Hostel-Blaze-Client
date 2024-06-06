import axios from "axios";
export const axiosPublic =axios.create({
    baseURL:'http://localhost:5000'
})
const userAxios = () => {
    return axiosPublic;
};

export default userAxios;