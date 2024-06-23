import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLoaderData, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import useAxiosSecure from "../../AxoisHook/useAxiosSecure";
import useMembership from "../../Hooks/useMembership";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const memberships = useLoaderData();
    const membership = memberships?.find(item => item._id === id);
    const { price, description, badge, features, color } = membership;
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [member, refetch] = useMembership();

    const totalPrice = member.reduce((total, item) => total + item.price, 0);

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
                    badge: badge,
                    status:'Pending'
                    
                };

                try {
                    const res = await axiosSecure.patch('/users/membership', updatedUser);
                    refetch();
                    if (res.data.message === 'Membership updated successfully') {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Thank you for your payment!",
                            showConfirmButton: false,
                            timer: 1500
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
                        <h3 className={`${color} text-2xl text-center p-2`}>{badge}</h3>
                        <div className="p-2 flex flex-col flex-grow">
                            <h1 className="text-center font-bold text-2xl mt-5">Price: {price}$</h1>
                            <div className="flex-grow space-y-2 mt-5">
                                <p>Description: {description}</p>
                                <ul className="list-disc ml-5">
                                    {features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
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

export default CheckoutForm;
