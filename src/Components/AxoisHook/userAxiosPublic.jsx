import axios from "axios";

export const axiosPublic=axios.create({
    baseURL:'https://hostel-blaze-server.vercel.app'
})

const userAxiosPublic = () => {
    return axiosPublic;
};

export default userAxiosPublic;