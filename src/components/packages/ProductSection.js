import { useCart } from "@/context/CartContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WeightProgress from "../products/WeightProgress";

export default function ProductSection({ products, pack, packId, packImg }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [totalPriceInclTax, setTotalPriceInclTax] = useState(
    pack.price_incl_tax
  );
  const [totalPriceExclTax, setTotalPriceExclTax] = useState(
    pack.price_excl_tax
  );
  const [totalShippingCharge, setTotalShippingCharge] = useState(0);
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  useEffect(() => {
    setTotalPriceInclTax(pack.price_incl_tax.toFixed(2));
    setTotalPriceExclTax(pack.price_excl_tax.toFixed(2));

    // Calculate total shipping charge
    const totalShipping = products.reduce((acc, item) => {
      return acc + (item.shipping_charges || 0);
    }, 0);

    setTotalShippingCharge(totalShipping);
  }, [quantity, pack.price_incl_tax, pack.price_excl_tax, products]);

  const generateUniqueKey = () => {
    return `${pack.name}-${packId}`;
  };

  const totalShipping = products.reduce((acc, item) => {
    return acc + (item.shipping_charges || 0);
  }, 0);

  const handleAddToCart = () => {
    const productToAdd = {
      name: pack.name,
      image: packImg,
      priceInclTax: totalPriceInclTax,
      priceExclTax: totalPriceExclTax,
      quantity: quantity,
      variants: "package",
      selectedVariants: [],
      uniqueKey: generateUniqueKey(),
      productId: packId,
      shipping_charge: totalShipping,
      totalWeight: pack.weight,
    };

    addToCart(productToAdd);
  };
  console.log(totalShippingCharge);

  return (
    <div className="flex flex-col items-start w-full">
      {products.map((item, index) => (
        <Link
          href={{
            pathname: `/shop`,
            query: {
              p: JSON.stringify({
                name: item.product_name,
                id: item.product_id,
              }),
            },
          }}
          key={index}
          className="flex flex-row items-center"
        >
          <div className="flex flex-row mlg:flex-wrap  items-center border-r-2 border-[#ebebeb] py-3 px-2">
            <img
              src={item.product_image}
              className="w-[55px] h-[55px] border border-[#ebebeb] mr-2"
            />
            <p className="text-[14px] px-5 text-left font-medium w-[250px]">
              {item.product_name}
            </p>
            <p className="text-[16px] px-5 text-left font-bold w-[100px]">
              {item.product_price_incl_tax} €{" "}
              {/* <span className="text-[12px] ml-2 text-[#333]">
                {" "}
                {item.shipping_charges} €{" "}
              </span> */}
            </p>
          </div>
          <p className="text-[16px] font-medium px-2 text-nowrap">x 1</p>
        </Link>
      ))}

      {/* Quantity And Add to cart button */}
      <div className="flex flex-row items-center my-3">
        {/* minus */}
        <button
          onClick={decreaseQuantity}
          className="px-1 py-2 border border-[#a2a2a2] flex items-center justify-center w-[44px] h-[44px] font-bold text-[20px] mx-1"
        >
          -
        </button>
        {/* quantity */}
        <p className="px-1 py-2 border border-[#a2a2a2] flex items-center justify-center w-[44px] h-[44px] text-[18px] mx-1 ">
          {quantity}
        </p>
        {/* plus */}
        <button
          onClick={increaseQuantity}
          className="px-1 py-2 border border-[#a2a2a2] flex items-center justify-center w-[44px] h-[44px] font-bold text-[20px] mx-1"
        >
          +
        </button>
        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="hover:bg-[#313537] text-white border-2 border-black bg-[#315593] text-[12px] mx-1 py-[1em] px-[2em] uppercase "
        >
          Ajouter au panier
        </button>
      </div>

      {/* Progress Bar */}

      {/* <WeightProgress
        currentWeight={(pack.weight * quantity).toFixed(2)}
        maxWeight={(pack.weight * quantity * 10).toFixed(2)}
      /> */}

      {/* ---Total price--- */}
      <p className="text-[16px] font-[800] leading-[23px] mb-2">Total:</p>
      <div className="flex flex-row items-center">
        <p className="text-[#0f0f0f] text-[20px] font-[800]">
          €{(totalPriceInclTax * quantity).toFixed(2)}
          <span className="text-[#7a7a7a] text-[15px] font-normal ml-1 ">
            ttc.
          </span>
        </p>
        <p className="text-[#0f0f0f] text-[17px] font-[500] ml-3">
          €{(totalPriceExclTax * quantity).toFixed(2)}
          <span className="text-[#7a7a7a] text-[15px] font-normal ml-1 ">
            ht.
          </span>
        </p>
      </div>
    </div>
  );
}
