import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../AxoisHook/userAxiosPublic";
import SectionTitle from "../SectionTitle/SectionTitle";
import SubscriptionCard from "./SubscriptionCard";
import sub from '../../assets/images/sub.avif'

const Subscription = () => {
  const axiosPublic = userAxiosPublic()

  const { data: membership = [] } = useQuery({
      queryKey: ['membership'],
      queryFn: async () => {
          const res = await axiosPublic.get('/membership');
          return res.data;
      }
  })

  return (
     <div className="">
      <div>
        <img className="w-full h-[400px]" src={sub} alt="" />
      </div>
      <div className="mt-5">
          <SectionTitle heading='Subscription' subHeading='Please subscribe to Request meal'></SectionTitle>
      </div>
       <div className="container m-auto  grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 p-5 ">
          {
              membership?.map(item =><SubscriptionCard key={item._id} item={item}></SubscriptionCard> )
          }
      </div>
     </div>
  );
};

export default Subscription;