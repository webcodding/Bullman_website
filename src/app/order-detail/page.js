"use client";
import React, { useEffect, useRef, useState } from "react";
import GuestOrderForm from "@/components/order-detail/GuestOrderForm";
import OrderDetails from "@/components/order-detail/OrderDetails";
import { createOrder, fetchFromBackend } from "@/utils/api";
import Breadcrumb from "@/utils/Breadcrumb";
import Link from "next/link";
import { BASE_DOMAIN } from "@/config";

export default function OrderDetail() {
  const [showForm, setShowForm] = useState(true);
  const [allOrders, setAllOrders] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const orderCreatedRef = useRef(false);

  // console.log(userId);

  useEffect(() => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      setUserId(user?._id);

      const storedOrderData =
        JSON.parse(localStorage.getItem("orderData")) || null;

      if (storedOrderData && !orderCreatedRef.current) {
        createOrderWhenPageLoads(storedOrderData);
        orderCreatedRef.current = true;
      } else {
        console.log("No order data found in localStorage");
      }
      if (user) {
        fetchAllOrders();
      }
    }
  }, []);

  const createOrderWhenPageLoads = async (orderData) => {
    try {
      const formattedDate = new Date().toISOString().split("T")[0]; // Formats date as "2024-01-29"
      const finalData = {
        delivery_address: {
          name: `${orderData.allAddress.deliver_address.fname} ${orderData.allAddress.deliver_address.lname}`,
          street: `${orderData.allAddress.deliver_address.address}`,
          city: `${orderData.allAddress.deliver_address.city}`,
          zip: `${orderData.allAddress.deliver_address.postalCode}`,
          country: `${orderData.allAddress.deliver_address.country}`,
          phone: orderData.allAddress.deliver_address.phone,
        },
        billing_address: {
          name: `${orderData.allAddress.billing_address.fname} ${orderData.allAddress.billing_address.lname}`,
          street: `${orderData.allAddress.billing_address.address}`,
          city: `${orderData.allAddress.billing_address.city}`,
          zip: `${orderData.allAddress.deliver_address.postalCode}`,
          country: `${orderData.allAddress.billing_address.country}`,
          phone: orderData.allAddress.billing_address.phone,
        },
        shipping_charges: orderData.shippingCharge,
        confirm_order: true,
        ecom_customer_id: orderData.userId,
        shipping: orderData.shippingMethod, // gls, dachser, dpd,
        payment_method: orderData.paymentMethod,
        ecom_create_date: formattedDate, // "2024-01-29"
        product_details: orderData.productDetails,
      };
      console.log(finalData);

      // Create the order
      const orderResponse = await createOrder(finalData);
      //console.log(orderResponse);

      if (orderResponse.order_id) {
        localStorage.removeItem("orderData");
        const orderId = await orderResponse.order_id;
        const orderNumber = await orderResponse.order_number;
        const updatedOrderHistory = [
          ...orderHistory,
          { orderId, orderNumber, product_details: orderData.productDetails },
        ];
        setOrderHistory(updatedOrderHistory);

        // Send the updated orderHistory array to your backend
        await saveOrderHistory(updatedOrderHistory, orderData.userId);
      } else {
        //  console.log("Failed to create order", orderCreatedData);
      }
    } catch (error) {
      console.log("An error occurred while creating the order:", error);
    }
  };

  // Function to save order history to the backend
  const saveOrderHistory = async (orderHistory, userId) => {
    try {
      const response = await fetch(`${BASE_DOMAIN}/orders/save-order-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderHistory, userId }),
      });

      if (response.ok) {
        console.log("Order history saved successfully");
      } else {
        console.log("Failed to save order history");
      }
    } catch (error) {
      console.log("An error occurred while saving the order history:", error);
    }
  };

  const fetchAllOrders = async () => {
    const userAllOrders = await fetchFromBackend(`/get-all-orders/${userId}`);
    console.log(userAllOrders);
    if (userAllOrders) {
      // Sort the orders by item.id in descending order
      userAllOrders.items.sort((a, b) => b.id - a.id);
      setAllOrders(userAllOrders);
    }
  };

  return (
    <div className="mt-10 px-20 nsm:px-5">
      <Breadcrumb slug={"Historique des commandes "} />
      <h2 className="text-[#333] text-[26px]">Historique des commandes </h2>
      {allOrders ? (
        <div className="">
          {allOrders.items.map((item, index) => (
            <Link
              href={{
                pathname: "/single-order-detail",
                query: { id: item.id },
              }}
              key={index}
            >
              <div className="border border-[#eee] shadow-lg bg-white rounded-[5px] py-4 px-10  my-3 mb-5 mx-5 nsm:mx-0">
                <div className="flex flex-row justify-between items-center">
                  {/* order number */}
                  <div className="border border-[#acacad] py-2 flex flex-row items-center px-3 rounded-[3px] w-[180px]">
                    <span className="mr-2">Commande:</span>
                    <p className="">{item.number}</p>
                  </div>
                  {/* status */}
                  <div
                    className={`${
                      item.delivery_status === "done"
                        ? "border-2 border-[#315593] text-[#315593]"
                        : "border-2 border-[#acacad]"
                    } flex flex-row items-center justify-center px-2 rounded-[6px] h-[30px] font-medium uppercase`}
                  >
                    {item.delivery_status === "partial_delivered"
                      ? "Partial Delivered"
                      : item.delivery_status}
                  </div>
                </div>

                <div className="mt-2 border border-[#acacad] px-2 flex flex-row nsm:flex-wrap items-center justify-between">
                  <div className="flex flex-col w-1/3 items-center border-r border-[#acacad]">
                    <p className="text-[17px] font-semibold mb-2 ">Facture à</p>
                    <p> {item.invoice_address}</p>
                  </div>
                  <div className="flex flex-col w-1/3 items-center border-r border-[#acacad] ">
                    <p className="text-[17px] font-semibold mb-2">Total TTC</p>
                    <p className="">{item.total}€</p>
                  </div>
                  <div className="flex flex-col w-1/3 items-center border-r border-[#acacad] ">
                    <p className="text-[17px] font-semibold mb-2">Total TVA</p>
                    <p className="">{item.amount_tax} €</p>
                  </div>
                  {/* order date */}
                  <div className="flex flex-col w-1/3 items-center ">
                    <p className="text-[17px] font-semibold mb-2">Créé à</p>
                    <p className="">{item.order_date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>
          Voici les commandes que vous avez passées depuis la création de votre
          compte.
        </p>
      )}
      {/* {showForm ? (
        <GuestOrderForm setShowForm={setShowForm} />
      ) : (
        <OrderDetails />
      )} */}
    </div>
  );
}
