import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import useAxiosSecure from "../../AxoisHook/useAxiosSecure";

import Swal from "sweetalert2";
import useCart from "../../Hooks/useCart";

const AllCheckoutForm = () => {

    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                const updatedUser = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status:'Pending',
                    subscription:'subscribed'

                };

                try {
                    const res = await axiosSecure.post('/payments', updatedUser);
                    refetch();
                    if (res.data.message === 'Membership updated successfully') {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Thank you for your payment!",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            // Navigate to desired route after successful upgrade
                            navigate('/Meals'); // Example: navigate to dashboard
                        });
                    } else {
                        setError('Failed to update membership');
                    }
                } catch (error) {
                    setError('Failed to update membership');
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <section>
                <div className="w-2/3 min-h-screen container m-auto">
                    <div className="shadow-lg shadow-sky-800 flex flex-col group animate__animated animate__bounceIn h-full">
                       
                        <div className="p-2 flex flex-col flex-grow">
                          <div className="flex-grow space-y-2 mt-5">
                               
                              
                            </div>
                            <p className="border-b-2 border-blue-500 mt-5 my-2"></p>
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': { color: '#aab7c4' },
                                        },
                                        invalid: { color: '#9e2146' },
                                    },
                                }}
                            />
                            {error && <div className="text-red-600">{error}</div>}
                            <div className="flex justify-center mt-auto">
                                <button className="bg-white border-r-4 border-b-4 border-blue-600 hover:bg-black px-4 py-2 rounded-md my-3 text-blue-500 font-bold" type="submit">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    );
};

export default AllCheckoutForm;
