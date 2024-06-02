import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import b1 from '../../assets/images/1.jpg';
import b2 from '../../assets/images/2.jpg';
import b3 from '../../assets/images/3.jpg';
import b4 from '../../assets/images/p4.jpg';
import b5 from '../../assets/images/5.jpg';

const Banner = () => {
    return (
        <div className=" w-full h-screen ">
            <Carousel 
                className="plo" 
                autoPlay 
                interval={2000} 
                infiniteLoop
                showThumbs={true}
                showStatus={true}
            >
                 {[b1, b2, b3, b4, b5].map((image, index) => (
                    <div key={index} className="relative h-full max-sm:mt-10">
                        <img className="w-full h-full object-cover" src={image} alt={`Banner ${index + 1}`} />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 md:px-0">
                            <div className="mb-20 md:mb-80 text-center">
                                <h1 className="text-2xl md:text-8xl font-bold text-gradient mb-4 md:mb-10">Welcome to Hostel Blaze</h1>
                                <p className="text-sm md:text-lg text-gray-300 mb-4"> Discover your home away from home at Wanderlust Hostel, where adventure meets comfort. Located in the heart of the city, our hostel offers affordable accommodations, vibrant community spaces, and unforgettable experiences. Whether you're a solo traveler, a group of friends, or on a business trip, we provide the perfect base to explore and create lasting memories. Book your stay with us and embark on your next adventure!</p>
                                <div className="join w-full md:w-96 mt-5">
                                    <input type="text" placeholder="Search" className="input input-bordered join-item w-full" />
                                    <button className="btn btn-primary join-item">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div className="relative h-full">
                    <img className="w-full h-full object-cover" src={b2} alt="Banner 2" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center ">
                        <div className="mb-80">
                            <h1 className="text-4xl font-bold text-gradient mb-10 ">Welcome to Hostel Blaze</h1>
                            <p className="text-lg text-gray-300 mb-4"> Discover your home away from home at Wanderlust Hostel, where adventure meets comfort. Located in the heart of the city, our hostel offers affordable accommodations, vibrant community spaces, and unforgettable experiences. Whether you're a solo traveler, a group of friends, or on a business trip, we provide the perfect base to explore and create lasting memories. Book your stay with us and embark on your next adventure!</p>
                            <div className="join w-96 mt-5">
                                <input type="text" placeholder="Search" className="input input-bordered join-item w-full" />
                                <button className="btn btn-primary join-item">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full">
                    <img className="w-full h-full object-cover" src={b3} alt="Banner 3" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center ">
                        <div className="mb-80">
                            <h1 className="text-4xl font-bold text-gradient mb-10 ">Welcome to Hostel Blaze</h1>
                            <p className="text-lg text-gray-300 mb-4"> Discover your home away from home at Wanderlust Hostel, where adventure meets comfort. Located in the heart of the city, our hostel offers affordable accommodations, vibrant community spaces, and unforgettable experiences. Whether you're a solo traveler, a group of friends, or on a business trip, we provide the perfect base to explore and create lasting memories. Book your stay with us and embark on your next adventure!</p>
                            <div className="join w-96 mt-5">
                                <input type="text" placeholder="Search" className="input input-bordered join-item w-full" />
                                <button className="btn btn-primary join-item">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full">
                    <img className="w-full h-full object-cover" src={b4} alt="Banner 4" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center ">
                        <div className="mb-80">
                            <h1 className="text-4xl font-bold text-gradient mb-10 ">Welcome to Hostel Blaze</h1>
                            <p className="text-lg text-gray-300 mb-4"> Discover your home away from home at Wanderlust Hostel, where adventure meets comfort. Located in the heart of the city, our hostel offers affordable accommodations, vibrant community spaces, and unforgettable experiences. Whether you're a solo traveler, a group of friends, or on a business trip, we provide the perfect base to explore and create lasting memories. Book your stay with us and embark on your next adventure!</p>
                            <div className="join w-96 mt-5">
                                <input type="text" placeholder="Search" className="input input-bordered join-item w-full" />
                                <button className="btn btn-primary join-item">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full">
                    <img className="w-full h-full object-cover" src={b5} alt="Banner 5" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center ">
                        <div className="mb-80">
                            <h1 className="text-4xl font-bold text-gradient mb-10 ">Welcome to Hostel Blaze</h1>
                            <p className="text-lg text-gray-300 mb-4"> Discover your home away from home at Wanderlust Hostel, where adventure meets comfort. Located in the heart of the city, our hostel offers affordable accommodations, vibrant community spaces, and unforgettable experiences. Whether you're a solo traveler, a group of friends, or on a business trip, we provide the perfect base to explore and create lasting memories. Book your stay with us and embark on your next adventure!</p>
                            <div className="join w-96 mt-5">
                                <input type="text" placeholder="Search" className="input input-bordered join-item w-full" />
                                <button className="btn btn-primary join-item">Search</button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </Carousel>
        </div>
    );
};

export default Banner;
