import { useQuery } from "@tanstack/react-query";

import userAxiosPublic from "../AxoisHook/userAxiosPublic";



const useUpComingMeals = () => {
    const axiosPublic =userAxiosPublic()

 const {data: upComingMeals =[],isPending:loading,refetch} = useQuery({
    queryKey:['upComingMeals'],
    queryFn: async()=>{
        const res = await axiosPublic.get('/upComingMeals')
        return res.data;
    }
 })
 return[upComingMeals,loading,refetch]
};

export default useUpComingMeals;