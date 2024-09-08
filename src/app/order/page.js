import dynamic from "next/dynamic";

// Dynamically import the OrderComponent with SSR disabled
const OrderComponent = dynamic(
  () => import("../../components/order/OrderComponent"),
  { ssr: false }
);

export default function Order() {
  return <OrderComponent />;
}
