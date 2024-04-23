import React, { useState } from 'react';
import { PaymentElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    // Handle error
    if (error) {
      setMessage(error.message);
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    // Implement cancellation logic here
    console.log('Payment cancelled');
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button type="submit" disabled={isLoading || !stripe || !elements} id="submit">
        {isLoading ? 'Processing...' : 'Pay now'}
      </button>
      <button
  type="button"
  onClick={() => {
    handleCancel();
    window.location.href = "http://localhost:5173/home"; // Navigate to the specified URL
  }}
  disabled={isLoading}
  id="cancel"
>
  Cancel
</button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
