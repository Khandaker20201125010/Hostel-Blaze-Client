import  { useContext } from 'react';
import useCountAxois from '../AxoisHook/useCountAxois';
import { AuthContext } from '../Providers/Authprovider';
import { useQuery } from '@tanstack/react-query';

const useLikeQuary = () => {
    const axiosSecure = useCountAxois();
    const { user } = useContext(AuthContext);
    const {refetch, data: like = [] } = useQuery({
        queryKey: ['like',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/likes?email=${user.email}`);
            return res.data;
            
        }
     
    });
    return [like,refetch];
    
};

export default useLikeQuary;