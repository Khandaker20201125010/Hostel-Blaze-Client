import { useQuery } from '@tanstack/react-query';
import useCountAxois from '../AxoisHook/useCountAxois';
import { useContext } from 'react';
import { AuthContext } from '../Providers/Authprovider';

const useMealQuary = () => {
    const axiosSecure = useCountAxois();
    const { user } = useContext(AuthContext);
    const { data: cart = [], refetch } = useQuery({
        queryKey: ['cart', user?.email],
        enabled: !!user?.email, // Ensure the query runs only if the user email is available
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    });
    return [cart,refetch];
};

export default useMealQuary;
