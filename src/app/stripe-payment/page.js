"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const Key = "";

const stripePromise = loadStripe(Key); // Replace with your actual publishable key
export const dynamic = "force-dynamic";

const CheckoutForm = ({ submitData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { clientSecret } = await fetch(
      "http://localhost:3001/stripe-payment/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 5000, currency: "eur" }), // Replace with your actual amount and currency
      }
    ).then((res) => res.json());

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        localStorage.setItem("orderData", JSON.stringify(submitData));
        alert("Payment successful!");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
              padding: "10px 12px",
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#6772e5",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}
    </form>
  );
};

const StripeCheckout = ({ searchParams }) => {
  return (
    <div className="mt-10">
      <Elements stripe={stripePromise}>
        <CheckoutForm submitData={searchParams?.submitData || null} />
      </Elements>
    </div>
  );
};

export default StripeCheckout;
