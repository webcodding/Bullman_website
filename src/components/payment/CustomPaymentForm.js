const {
  useStripe,
  useElements,
  PaymentElement,
} = require("@stripe/react-stripe-js");
const { useState } = require("react");

function CustomPaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const appearance = {
    theme: "flat", // or 'stripe' or 'night' or 'none'
    variables: {
      fontFamily: ' "Helvetica Neue", Helvetica, sans-serif',
      fontWeightNormal: "500",
      borderRadius: "8px",
      colorBackground: "#f6f9fc",
      colorPrimary: "#3a3d40",
      colorPrimaryText: "#333",
      spacingUnit: "4px",
      spacingGridRow: "15px",
      colorLabel: "#fff", // Custom label color
      colorTextSecondary: "#3a3d40",
    },
    rules: {
      ".Label": {
        color: "#fff", // Custom label color
        fontWeight: "bold",
        fontSize: "14px",
      },
      ".Input": {
        backgroundColor: "#fff",
        color: "#333",
      },
      ".Input--focus": {
        backgroundColor: "#e8f0fe",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/order-detail",
      },
    });

    if (error) {
      console.log("Payment error:", error.message);
    } else {
      console.log("Payment successful!");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white mt-8 p-2">
      <div className="flex flex-row items-center justify-center mb-10">
        <img src="/img/stripe.png" className=" w-[150px] h-[60px]" />
      </div>
      <PaymentElement options={{ appearance }} />
      <div className="flex flex-row items-center justify-center w-full">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="mt-4 bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
}
export default CustomPaymentForm;
