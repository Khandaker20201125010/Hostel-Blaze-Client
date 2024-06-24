import { useContext } from "react";
import useAxiosSecure from "../AxoisHook/useAxiosSecure";
import { AuthContext } from "../Providers/Authprovider";
import { useQuery } from "@tanstack/react-query";


const useSubscription = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isSubscribe, isPending: isSubscriptionLoading } = useQuery({
        queryKey: [user?.email, 'isSubscription'],
        enabled: !loading,
        queryFn: async () => {
          
            const res = await axiosSecure.get(`/users/subscription/${user.email}`);
            // console.log(res.data);
            return res.data?.subscription;
        }
    })
    return [isSubscribe, isSubscriptionLoading]
};


export default useSubscription;