import { useQuery } from '@tanstack/react-query';
import useCountAxois from '../AxoisHook/useCountAxois';
import { useContext } from 'react';
import { AuthContext } from '../Providers/Authprovider';

const useMealQuary = () => {
    const axiosSecure = useCountAxois();
    const { user } = useContext(AuthContext);
    const {refetch, data: cart = [] } = useQuery({
        queryKey: ['cart',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
            
        }
     
    });
    return [cart,refetch];
    
    
};

export default useMealQuary;
