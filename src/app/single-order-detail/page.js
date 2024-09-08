"use client";
import OrderDetails from "@/components/order-detail/OrderDetails";
import { fetchFromBackend } from "@/utils/api";
import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function SingleOrderDetail({ searchParams }) {
  const orderId = searchParams?.id || null;
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;
      const fetchOrderDetails = async () => {
        if (orderId) {
          const userOrderDetail = await fetchFromBackend(
            `/get-single-orders/user/${userId}/order/${orderId}`
          );
          console.log(userOrderDetail);
          if (userOrderDetail) {
            setOrderDetail(userOrderDetail);
          }
        }
      };
      fetchOrderDetails();
    }
  }, []);

  return (
    <div>
      {orderDetail ? (
        <OrderDetails orderDetail={orderDetail} />
      ) : (
        <div className="mt-10 px-16">
          <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
