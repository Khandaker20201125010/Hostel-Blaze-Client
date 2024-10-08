import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../AxoisHook/userAxiosPublic";
import MembershipCard from "./MembershipCard/MembershipCard";
import SectionTitle from "../SectionTitle/SectionTitle";

const Membership = () => {
    const axiosPublic = userAxiosPublic()

    const { data: membership = [], refetch } = useQuery({
        queryKey: ['membership'],
        queryFn: async () => {
            const res = await axiosPublic.get('/membership');
            return res.data;
        }
    })

    return (
       <div className="mt-20">
        <div>
            <SectionTitle heading='MemberShip' subHeading='Get you membership now for Exclusive offer'></SectionTitle>
        </div>
         <div className="container m-auto  grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 p-5 ">
            {
                membership?.map(item =><MembershipCard key={item._id} item={item}></MembershipCard> )
            }
        </div>
       </div>
    );
};

export default Membership;