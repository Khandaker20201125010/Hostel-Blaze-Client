import SectionTitle from "../SectionTitle/SectionTitle";

const MembershipCard = () => {
  return (
   <div>
    <div className="mt-40">
    <div>
                <SectionTitle   heading={"Membership"} subHeading={"Get you membership now to for better experience of meals "}>
                  
                </SectionTitle>
            </div>
        
    </div>
     <div className="mt-10 container m-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Regular Meal Plan Card */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className=" bg-slate-400 text-white p-6 text-center rounded-t-lg">
          <h3 className="text-2xl font-bold">Silver</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-4xl font-bold">$9</div>
          <div className="text-sm text-gray-500">per meal</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
              </svg>
              Balanced nutrition
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
              </svg>
              Fixed meal timings
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
              </svg>
              Vegetarian options available
            </li>
          </ul>
        </div>
        <div className="p-6">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Upgrade to Regular
          </button>
        </div>
      </div>

      {/* Deluxe Meal Plan Card */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className=" bg-yellow-500 text-white p-6 text-center rounded-t-lg">
          <h3 className="text-2xl font-bold">Gold</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-4xl font-bold">$19</div>
          <div className="text-sm text-gray-500">per meal</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
              </svg>
              Customizable menu
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
              </svg>
              Snacks included
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
              </svg>
              Choice of vegetarian or non-vegetarian
            </li>
          </ul>
        </div>
        <div className="p-6">
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">
            Upgrade to Deluxe
          </button>
        </div>
      </div>

      {/* Premium Meal Plan Card */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className=" bg-slate-600 text-white p-6 text-center rounded-t-lg">
          <h3 className="text-2xl font-bold">Platinum</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-4xl font-bold">$49</div>
          <div className="text-sm text-gray-500">per meal</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
              </svg>
              Gourmet meals
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
              </svg>
              Special dietary requirements catered
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
              </svg>
              Exclusive chef's specials
            </li>
          </ul>
        </div>
        <div className="p-6">
          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
   </div>
  );
};

export default MembershipCard;
