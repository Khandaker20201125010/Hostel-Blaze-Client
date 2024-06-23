import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm/CheckoutForm';





const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    return (
        <div>
            <div className='mt-5'>
            <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle>
            
        </div>
        <div>
            <Elements stripe={stripePromise}>
             <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
        </div>
    );
};

export default Payment;