import { useCart } from "@/context/CartContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import CartProductSlider from "./CartProductSlider";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartModal({ showCart, setShowCart }) {
  const { cartItems, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [totalWithoutVAT, setTotalWithoutVAT] = useState(0);
  const [totalVAT, setTotalVAT] = useState(0);
  const [totalWithVAT, setTotalWithVAT] = useState(0);
  const [totalShippingCharge, setTotalShippingCharge] = useState(0);
  const router = useRouter();
  //console.log(cartItems);

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      if (item.selectedVariants.length > 0) {
        item.selectedVariants.forEach((variant) => {
          const variantKey = Object.keys(variant).find(
            (key) => key !== "priceInclTax" && key !== "quantity"
          );
          initialQuantities[`${item.name}-${variant[variantKey]}`] =
            variant.quantity;
        });
      } else {
        initialQuantities[item.name] = item.quantity;
      }
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const increaseQuantity = (itemKey) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemKey]: (prevQuantities[itemKey] || 0) + 1,
    }));
  };

  const decreaseQuantity = (itemKey) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemKey]:
        (prevQuantities[itemKey] || 1) > 1 ? prevQuantities[itemKey] - 1 : 1,
    }));
  };

  useEffect(() => {
    calculateTotals();
  }, [quantities, cartItems]);

  const calculateTotals = () => {
    let totalWithoutVAT = 0;
    let totalVAT = 0;
    let totalWithVAT = 0;
    let totalShippingCharge = 0; // Variable to store total shipping charge

    cartItems.forEach((item) => {
      let itemShippingCharge = item.shipping_charge || 0; // Default to 0 if shipping charge is not defined

      if (item.selectedVariants.length > 0) {
        item.selectedVariants.forEach((variant) => {
          const variantKey = Object.keys(variant).find(
            (key) => key !== "priceInclTax" && key !== "quantity"
          );
          const itemKey = `${item.name}-${variant[variantKey]}`;
          const variantQuantity = quantities[itemKey] || variant.quantity;
          const itemTotalExclVAT = variant.priceExclTax * variantQuantity;
          const itemTotalInclVAT = variant.priceInclTax * variantQuantity;

          totalWithoutVAT += itemTotalExclVAT;
          totalWithVAT += itemTotalInclVAT;
          totalVAT += itemTotalInclVAT - itemTotalExclVAT;

          // Calculate the total shipping charge for this variant
          totalShippingCharge += itemShippingCharge * variantQuantity;
        });
      } else {
        const itemQuantity = quantities[item.name] || item.quantity;
        const itemTotalExclVAT = item.priceExclTax * itemQuantity;
        const itemTotalInclVAT = item.priceInclTax * itemQuantity;

        totalWithoutVAT += itemTotalExclVAT + totalShippingCharge;
        totalWithVAT += itemTotalInclVAT + totalShippingCharge;
        totalVAT += itemTotalInclVAT - itemTotalExclVAT;

        // Calculate the total shipping charge for this item
        totalShippingCharge += itemShippingCharge * itemQuantity;
      }
    });

    setTotalWithoutVAT(totalWithoutVAT.toFixed(2));
    setTotalVAT(totalVAT.toFixed(2));
    setTotalWithVAT(totalWithVAT.toFixed(2));
    setTotalShippingCharge(totalShippingCharge.toFixed(2));
  };

  return (
    <div
      className={`fixed bg-white w-[440px] xsm:w-full h-full top-0 right-0 text-black z-50 p-[10px] flex flex-col`}
    >
      {/* Top content */}
      <div className="flex-shrink-0 flex flex-row items-center justify-between bg-navyBlue text-white p-[10px] z-50">
        <p className="uppercase font-bold text-[20px]">PANIER</p>
        <img
          src="/icons/close.png"
          className="w-[26px] h-[26px] hover-spin cursor-pointer"
          onClick={() => setShowCart((prevOpen) => !prevOpen)}
        />
      </div>
      {/* Cart Items */}
      <div className="flex-grow overflow-y-auto mt-2">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="relative flex flex-row items-center bg-white shadow-lg border border-[#315593] p-[10px] mt-2"
            >
              <i
                className="fa-solid fa-xmark absolute top-2 right-2 text-[#333] text-[14px] cursor-pointer"
                onClick={() => removeFromCart(item.uniqueKey)}
              ></i>
              <Link
                href={
                  item.variants === "package"
                    ? {
                        pathname: `/package-shop`,
                        query: {
                          pkg: JSON.stringify({
                            name: item.name,
                            id: item.productId,
                          }),
                        },
                      }
                    : {
                        pathname: `/shop`,
                        query: {
                          p: JSON.stringify({
                            name: item.name,
                            id: item.productId,
                          }),
                        },
                      }
                }
                // href="#"
              >
                <Image
                  src={item.image}
                  width={77}
                  height={100}
                  className="w-[77px] h-[100px] object-contain hover:scale-110"
                />
              </Link>
              <div className="flex flex-col mx-5">
                <Link
                  href={
                    item.variants === "package"
                      ? {
                          pathname: `/package-shop`,
                          query: {
                            pkg: JSON.stringify({
                              name: item.name,
                              id: item.productId,
                            }),
                          },
                        }
                      : {
                          pathname: `/shop`,
                          query: {
                            p: JSON.stringify({
                              name: item.name,
                              id: item.productId,
                            }),
                          },
                        }
                  }
                  //href="#"
                >
                  <p className="text-[#333] text-[14px] mb-3">{item.name}</p>
                </Link>
                {item.selectedVariants.length > 0 ? (
                  item.selectedVariants.map((variant) => {
                    const variantKey = Object.keys(variant).find(
                      (key) => key !== "priceInclTax" && key !== "quantity"
                    );
                    return (
                      <div
                        key={variant[variantKey]}
                        className="flex flex-col mb-2"
                      >
                        <p className="text-[12px]">
                          {variantKey}: {variant[variantKey]}
                        </p>
                        <div className="flex flex-row h-[35px] items-center">
                          <div className="border px-5 py-[5px] flex items-center justify-center">
                            {quantities[`${item.name}-${variant[variantKey]}`]}
                          </div>
                          <div className="flex flex-col">
                            <i
                              className="fa-solid fa-chevron-up text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                              onClick={() =>
                                increaseQuantity(
                                  `${item.name}-${variant[variantKey]}`
                                )
                              }
                            ></i>
                            <i
                              className="fa-solid fa-chevron-down text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                              onClick={() =>
                                decreaseQuantity(
                                  `${item.name}-${variant[variantKey]}`
                                )
                              }
                            ></i>
                          </div>
                          <p className="text-[12px] italic font-bold text-[#aaa] ml-3">
                            {(
                              parseInt(variant.priceInclTax) *
                              (quantities[
                                `${item.name}-${variant[variantKey]}`
                              ] || variant.quantity)
                            ).toFixed(2)}{" "}
                            €
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-row h-[35px] items-center">
                    <div className="border px-5 py-[5px] flex items-center justify-center">
                      {quantities[item.name]}
                    </div>
                    <div className="flex flex-col">
                      <i
                        className="fa-solid fa-chevron-up text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                        onClick={() => increaseQuantity(item.name)}
                      ></i>
                      <i
                        className="fa-solid fa-chevron-down text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                        onClick={() => decreaseQuantity(item.name)}
                      ></i>
                    </div>
                    <p className="text-[12px] italic font-bold text-[#aaa] ml-3">
                      {(
                        parseInt(item.priceInclTax) *
                        (quantities[item.name] || item.quantity)
                      ).toFixed(2)}{" "}
                      €
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-[10px] flex flex-row items-center w-full bg-[#D7E9FF] mt-4 border-l-[6px] border-[#b9d8fe]">
            <p className="text-[#606a7b] px-2 py-[6px] font-[500] text-[16px]">
              Votre panier est vide
            </p>
          </div>
        )}
        {cartItems.length > 0 ? (
          <>
            {/* Prices */}
            <div className="flex flex-col text-[16px] text-[#444] mt-14 font-medium mx-5 leading-[28px]">
              <div className="flex flex-row items-center justify-between border-b border-[#d2d2d2] py-[3px] mb-[10px]">
                <p>Livraison :</p>
                <p className="font-[800]">
                  {totalShippingCharge > 0
                    ? `${totalShippingCharge} €`
                    : "Gratuit"}
                </p>
              </div>
              <div className="flex flex-row items-center justify-between border-b border-[#d2d2d2] py-[3px] mb-[10px]">
                <p>TVA :</p>
                <p className="font-[800]">{totalVAT} €</p>
              </div>
              <div className="flex flex-row items-center justify-between border-b border-[#d2d2d2] py-[3px] mb-[10px]">
                <p>Total HT : :</p>
                <p className="font-[800]">{totalWithoutVAT} €</p>
              </div>
              <div className="flex flex-row items-center justify-between border-b border-[#d2d2d2] py-[3px] mb-[10px]">
                <p>Total TTC :</p>
                <p className="font-[800]">{totalWithVAT} €</p>
              </div>
            </div>
            {/* product slider */}
            <CartProductSlider />
          </>
        ) : null}
      </div>
      {cartItems.length > 0 ? (
        <>
          {/* Bottom content */}
          <div className="flex-shrink-0 bg-[#f0efef] flex flex-row items-center justify-between -mb-[4px]">
            <button
              className="w-[65%] text-[1rem] font-medium tracking-[.1em] py-[13px] px-[15px] bg-navyBlue hover:bg-darkSlate text-white border-2 border-[#000] m-1"
              onClick={() => {
                setShowCart(false);
                router.push("/order");
              }}
            >
              Commander
            </button>
            <div className="px-[7px] text-center">
              <p className="text-[15px] text-[#444] font-medium leading-[16px]">
                Total de la commande
              </p>
              <p className="text-[15px] text-[#444] font-[900]">
                {totalWithVAT} €
              </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
