import { useContext } from 'react';
import useCountAxois from '../AxoisHook/useCountAxois'; // Assuming this is the correct path
import { AuthContext } from '../Providers/Authprovider';
import { useQuery } from '@tanstack/react-query';

const useLikeQuary = () => {
  const axiosSecure = useCountAxois();
  const { user } = useContext(AuthContext);

  const { refetch, data: meal = [] } = useQuery({
    queryKey: ['meal', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal?email=${user.email}`);
      return res.data;
    },
  });

  return [meal, refetch];
};

export default useLikeQuary;
