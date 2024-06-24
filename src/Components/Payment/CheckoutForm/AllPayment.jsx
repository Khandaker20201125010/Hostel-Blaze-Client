import { loadStripe } from '@stripe/stripe-js';

import { Elements } from '@stripe/react-stripe-js';

import AllCheckoutForm from './AllCheckoutForm';
import SectionTitle from '../../SectionTitle/SectionTitle';





const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const AllPayment = () => {
    return (
        <div>
            <div className='mt-5'>
            <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle>
            
        </div>
        <div>
            <Elements stripe={stripePromise}>
             <AllCheckoutForm></AllCheckoutForm>
            </Elements>
        </div>
        </div>
    );
};

export default AllPayment;