import { useContext } from "react";
import { AuthContext } from "../Providers/Authprovider";
import axios from 'axios';
import Swal from "sweetalert2";

const Subscription = () => {
    const { user, setUser } = useContext(AuthContext);

    const handleSubscribe = () => {
        if (user && user.email) {
            axios.post('http://localhost:5000/subscribe', { email: user.email })
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
        <div>
            <h1>Subscribe to Our Service</h1>
            <button onClick={handleSubscribe}>Subscribe</button>
        </div>
    );
};

export default Subscription;
