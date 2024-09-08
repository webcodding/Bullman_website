// components/payment/CustomMollieForm.js

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_LOCAL_DOMAIN } from "@/config";

export default function CustomMollieForm({ clientSecret }) {
  const [selectedMethod, setSelectedMethod] = useState("ideal");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log(clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_LOCAL_DOMAIN}/payments/confirm-mollie-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: clientSecret,
            selectedMethod: selectedMethod,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push(data.redirectUrl); // Redirect to order detail page
      } else {
        console.error("Payment confirmation error:", data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(selectedMethod);

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white mt-8 p-2">
      <div>
        <label>Choose a payment method:</label>
        <div>
          <label>
            <input
              type="radio"
              value="ideal"
              checked={selectedMethod === "ideal"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            iDEAL
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="paypal"
              checked={selectedMethod === "paypal"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            PayPal
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="banktransfer"
              checked={selectedMethod === "banktransfer"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            Bank Transfer
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="klarna"
              checked={selectedMethod === "klarna"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            Klarna
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="sofort"
              checked={selectedMethod === "sofort"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            SOFORT
          </label>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full">
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
}
