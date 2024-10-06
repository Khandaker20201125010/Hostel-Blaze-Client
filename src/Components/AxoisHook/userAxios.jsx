import axios from "axios";
export const axiosPublic =axios.create({
    baseURL:'https://hostel-blaze-server.vercel.app'
})
const userAxios = () => {
    return axiosPublic;
};

export default userAxios;