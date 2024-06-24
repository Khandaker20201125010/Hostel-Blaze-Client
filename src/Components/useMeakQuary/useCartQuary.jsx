import React, { useContext } from 'react';
import useCountAxois from '../AxoisHook/useCountAxois';
import { AuthContext } from '../Providers/Authprovider';
import { useQuery } from '@tanstack/react-query';

const useCartQuary = () => {
    const axiosSecure = useCountAxois();
    const { user } = useContext(AuthContext);
    const { data: cart = [],  refetch } = useQuery({
        queryKey: ['cart', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/carts?email=${user.email}`);
                return res.data;
            } catch (error) {
                console.error('Error fetching carts:', error);
                throw new Error('Failed to fetch carts');
            }
        }
    });

  

    return [cart, refetch];
};

export default useCartQuary;