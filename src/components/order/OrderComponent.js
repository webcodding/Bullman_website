"use client";
import CartBox from "@/components/order/CartBox";
import CheckoutBox from "@/components/order/CheckoutBox";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY, BASE_DOMAIN } from "@/config";
import Modal from "@/components/Modal/Modal";
import {
  Elements,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import CustomPaymentForm from "@/components/payment/CustomPaymentForm";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default function OrderComponent() {
  const [personalInfo, setPersonalInfo] = useState({
    title: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    checkNewsletter: false,
    checkPrivacy: false,
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [allAddress, setAllAddress] = useState({
    deliver_address: {},
    billing_address: {},
  });

  const [paymentMethod, setPaymentMethod] = useState("mollie");
  const [amount, setAmount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("gls");
  const [totalProductWeight, setTotalProductWeight] = useState(null);
  const [totalPackWeight, setTotalPackWeight] = useState(null);
  const [description, setDescription] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const updateAmount = amount.toFixed(2).toString();
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      setUserId(user?._id);
      const newOrderId = `ORD-${uuidv4()}`;
      setOrderId(newOrderId);
    }
  }, []);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (amount > 5 && orderId !== "" && userId) {
      const submitData = {
        allAddress,
        paymentMethod,
        shippingCharge,
        shippingMethod,
        orderId,
        productDetails,
        userId: userId ? userId : null,
      };
      if (paymentMethod === "mollie") {
        // Mollie payment
        try {
          const response = await fetch(
            `${BASE_DOMAIN}/payments/create-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: updateAmount,
                description: `${allAddress.deliver_address.fname} ${allAddress.deliver_address.lname}`,
                redirectUrl: "http://localhost:3000/order-detail",
                orderId: orderId,
              }),
            }
          );
          const data = await response.json();

          if (response.ok) {
            setLoading(false);
            if (data && data._links && data._links.checkout) {
              window.location.href = data._links.checkout.href;
              localStorage.setItem("orderData", JSON.stringify(submitData));
            } else {
              console.log("Failed to create payment link", data);
            }
          } else {
            console.error("Error:", data);
          }
        } catch (error) {
          console.error("An error occurred while creating the payment:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Stripe payment
        const stripe = await stripePromise;
        console.log("continuing with stripe");
        const response = await fetch(
          `${BASE_DOMAIN}/stripe-payment/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: amount * 100, // Convert amount to cents
            }),
          }
        );
        console.log(response);
        if (response.ok) {
          localStorage.setItem("orderData", JSON.stringify(submitData));
        }

        const data = await response.json();
        // console.log(data);
        setClientSecret(data?.clientSecret);
        setIsModalOpen(true);
        setLoading(false);
        // const { error } = await initPaymentSheet({
        //   paymentIntentClientSecret: data.clientSecret,
        //   merchantDisplayName: "Bullman Equipment",
        //   applePay: true,
        //   googlePay: true,
        //   style: "automatic",
        //   testEnv: true,
        // });
      }
    } else {
      window.alert("Please Add a Cart item to create an order");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-row mt-20 px-20 justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row nlg:flex-col nlg:items-center mt-20 px-20 nlg:px-2">
      {/* Order Checkout */}
      <div className="w-4/5 bg-white p-5 nlg:px-0">
        <CheckoutBox
          description={description}
          setDescription={setDescription}
          handlePaymentSubmit={handlePaymentSubmit}
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          loginInfo={loginInfo}
          setLoginInfo={setLoginInfo}
          allAddress={allAddress}
          setAllAddress={setAllAddress}
          amount={amount} //total price
          totalProductWeight={totalProductWeight}
          totalPackWeight={totalPackWeight}
          shippingCharge={shippingCharge}
          setShippingCharge={setShippingCharge}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>

      {/* Cart Items */}
      <div className="ml-10 nlg:ml-0">
        <CartBox
          setAmount={setAmount}
          setTotalPackWeight={setTotalPackWeight}
          setTotalProductWeight={setTotalProductWeight}
          totalProductWeight={totalProductWeight}
          setProductDetails={setProductDetails}
          setShippingCharge={setShippingCharge}
        />
      </div>
      {/* Payment Modal */}
      {clientSecret !== "" && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CustomPaymentForm />
          </Elements>
        </Modal>
      )}
    </div>
  );
}
