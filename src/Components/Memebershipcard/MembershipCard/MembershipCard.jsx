import { Link } from "react-router-dom";

const MembershipCard = ({ item }) => {
  const { _id, price, description, badge, features, color } = item;
  return (
    <div className="shadow-lg shadow-sky-800 flex flex-col group animate__animated animate__bounceIn h-full">
      <h3 className={' text-2xl bg-gradient-to-r from-blue-700 to-yellow-600 0 font-bold text-center p-2 '}>{badge}</h3>
      <div className="p-10 flex flex-col flex-grow bg-gradient-to-r from-blue-600 to-black hover:bg-blue-800">
        <h1 className="text-center  font-bold text-2xl mt-5 text-white">Price: {price}$</h1>
        <div className="flex-grow space-y-2 mt-5">
          <p className="text-white">Description: {description}</p>
          <ul className="list-disc ml-5 text-white">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <p className="border-b-2 border-yellow-500 mt-5 my-2 "></p>
        <div className="flex justify-center mt-auto">
          <Link to={`/uDashboard/payment/${_id}`}>
            <button className={`bg-white border-r-4 border-b-4 border-blue-600 hover:bg-black px-4 py-2 rounded-md my-3 text-blue-500 font-bold`}>
              Check Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
