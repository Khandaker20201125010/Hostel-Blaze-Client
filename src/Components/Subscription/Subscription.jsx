import { useContext } from "react";
import { AuthContext } from "../Providers/Authprovider";
import axios from 'axios';
import Swal from "sweetalert2";

const Subscription = () => {
    const { user, setUser } = useContext(AuthContext);

    const handleSubscribe = () => {
        if (user && user.email) {
            axios.post('http://localhost:5000/carts', {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then(res => {
                    if (res.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Subscribed successfully!",
                        });
                        setUser({ ...user, isSubscribed: true });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Subscription failed",
                        });
                    }
                })
                .catch(error => {
                    console.error('Error subscribing:', error);
                });
        } else {
            Swal.fire({
                title: "Please Log in",
                text: "Please log in to subscribe",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log in!"
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold mb-4">Subscribe to Our Service</h1>
                <p className="text-gray-600 mb-6">Enjoy exclusive benefits by subscribing to our service!</p>
                <div className="flex flex-col">
                    <button onClick={handleSubscribe} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none">Subscribe Now</button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
