import { useQuery } from "@tanstack/react-query";

import userAxiosPublic from "../AxoisHook/userAxiosPublic";



const useMeals = () => {
    const axiosPublic =userAxiosPublic()



 const {data: meals =[],isPending:loading,refetch} = useQuery({
    queryKey:['meals'],
    queryFn: async()=>{
        const res = await axiosPublic.get('/meals')
        return res.data;
    }
 })
 return[meals,loading,refetch]
};

export default useMeals;
//  const [meals,setMeals] =useState([]);
//  const [loading,setloading] = useState(true);
//  useEffect(()=>{
//     fetch('http://localhost:5000/meals')
//     .then(res => res.json())
//     .then(data =>
//          {setMeals(data);
//          setloading(false); }
           
//              );
    
//  },[])