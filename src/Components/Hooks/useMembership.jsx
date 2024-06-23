import { useContext } from "react";
import useAxiosSecure from "../AxoisHook/useAxiosSecure";
import { AuthContext } from "../Providers/Authprovider";
import { useQuery } from "@tanstack/react-query";


const useMembership = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext);
    const { refetch, data: member = [] } = useQuery({
        queryKey: ['member', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/membership?email=${user.email}`);
            return res.data;
        }
    })

    return [member, refetch]
};

export default useMembership;