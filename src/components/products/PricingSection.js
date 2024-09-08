import React, { useContext, useEffect, useState } from "react";
import WeightProgress from "./WeightProgress";
import { useCart } from "@/context/CartContext";
import AuthContext from "@/context/AuthContext";
import axios from "axios";

export default function PricingSection({ variants, product, id }) {
  // console.log(product);
  const [quantity, setQuantity] = useState(1);
  const [variantQuantities, setVariantQuantities] = useState({});
  const { addToCart } = useCart();
  const { auth } = useContext(AuthContext);

  // console.log(auth.token);

  useEffect(() => {
    if (typeof variants !== "number") {
      const initialQuantities = {};
      Object.keys(variants).forEach((key) => {
        initialQuantities[key] = 0;
      });
      setVariantQuantities(initialQuantities);
    }
  }, [variants]);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const increaseTypeQuantity = (type) => {
    setVariantQuantities((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const decreaseTypeQuantity = (type) => {
    setVariantQuantities((prev) => ({
      ...prev,
      [type]: Math.max(prev[type] - 1, 0),
    }));
  };

  const calculateTotalPriceInclTax = () => {
    if (typeof variants === "number") {
      return product.price_incl_tax * quantity;
    }
    return Object.entries(variants).reduce((total, [key, value]) => {
      return total + value.price_incl_tax * variantQuantities[key];
    }, 0);
  };

  const calculateTotalPriceExclTax = () => {
    if (typeof variants === "number") {
      return product.price_excl_tax * quantity;
    }
    return Object.entries(variants).reduce((total, [key, value]) => {
      return total + value.price_excl_tax * variantQuantities[key];
    }, 0);
  };

  const parseWeight = (poids) => {
    const weightMatch = poids.match(/(\d+(\.\d+)?)/);
    return weightMatch ? parseFloat(weightMatch[0]) : 0;
  };

  const calculateTotalWeight = () => {
    if (typeof variants === "number") {
      return product.weight * quantity;
    }

    return Object.entries(variants).reduce((total, [key, value]) => {
      if (value.weight) {
        return total + value.weight * (variantQuantities[key] || 0);
      }
      return total;
    }, 0);
  };

  const maxWeight = (() => {
    if (typeof variants === "number") {
      return product.weight * 10;
    }

    return Object.entries(variants).reduce((max, [key, value]) => {
      if (value.weight) {
        return max + value.weight * 10;
      }
      return max;
    }, 0);
  })();

  const generateUniqueKey = (variantKey, variantQuantity) => {
    if (typeof variants === "number") {
      return `${product.name}-${quantity}`;
    }
    return `${product.name}-${variantKey}-${variantQuantity}`;
  };

  const calculateProductWeight = (key = null) => {
    // Case when there's a single variant (when variants is a number)
    if (key === null && typeof variants === "number") {
      return product.weight; // Assuming `weight` is a property of `product`
    }

    // Case when there are multiple variants (when variants is an object)
    if (key !== null && variants[key] && variants[key].weight) {
      return variants[key].weight;
    }

    return 0;
  };

  const handleAddToCart = () => {
    const productToAdd = {
      name: product.name,
      image: product.primary_image,
      priceInclTax: calculateTotalPriceInclTax(),
      priceExclTax: calculateTotalPriceExclTax(),
      quantity: quantity,
      selectedVariants: [],
      uniqueKey: generateUniqueKey(),
      productId: id,
      shipping_charge: product.shipping_charges ? product.shipping_charges : 0,
      totalWeight: calculateProductWeight(),
    };

    if (typeof variants === "number") {
      productToAdd.variants = JSON.stringify(variants);
      addToCart(productToAdd);
    } else {
      const productsToAdd = [];
      Object.entries(variants).forEach(([key, value]) => {
        if (variantQuantities[key] > 0) {
          productsToAdd.push({
            ...productToAdd,
            quantity: variantQuantities[key],
            variants: key,
            selectedVariants: [
              {
                ...value,
                quantity: variantQuantities[key],
                priceInclTax: value.price_incl_tax,
                priceExclTax: value.price_excl_tax,
              },
            ],
            uniqueKey: generateUniqueKey(key, variantQuantities[key]),
            totalWeight: calculateProductWeight(key),
          });
        }
      });
      productsToAdd.forEach((item) => addToCart(item));
    }
  };
  return (
    <div>
      {/* --- buttons ---- */}
      {typeof variants === "number" ? (
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
      ) : (
        <div className="flex flex-col border-b border-[#a7a5a5] mb-2 pb-2">
          {Object.entries(variants).map(([key, value]) => {
            // console.log(`Variant ID: ${key}`);
            return (
              <div
                key={key}
                className="flex flex-row justify-between items-center"
              >
                {value.Poids ? (
                  <p className="text-[14px]">Poids: {value.Poids}</p>
                ) : value.Couleur ? (
                  <p className="text-[14px]">Couleur: {value.Couleur}</p>
                ) : value.Epaisseur ? (
                  <p className="text-[14px]">Epaisseur: {value.Epaisseur}</p>
                ) : value.Stacks ? (
                  <p className="text-[14px]">Stacks: {value.Stacks}</p>
                ) : null}

                <div className="flex flex-row items-center my-2">
                  <p className="text-[16px] font-bold mr-6">
                    {value.price_incl_tax} €
                  </p>
                  {/* minus */}
                  <button
                    onClick={() => decreaseTypeQuantity(key)}
                    className="px-1 py-1 border border-[#a2a2a2] flex items-center justify-center w-[44px] h-[36px] font-bold text-[20px] mx-1"
                  >
                    -
                  </button>
                  {/* quantity */}
                  <p className="px-1 py-1 border border-[#a2a2a2] flex items-center justify-center w-[44px] h-[36px] text-[18px] mx-1 ">
                    {variantQuantities[key]}
                  </p>
                  {/* plus */}
                  <button
                    onClick={() => increaseTypeQuantity(key)}
                    className="px-1 py-1 border border-[#a2a2a2] flex items-center justify-center w-[44px] h-[36px] font-bold text-[20px] mx-1"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Progress Bar */}

      {/* <WeightProgress
        currentWeight={calculateTotalWeight()}
        maxWeight={maxWeight}
      /> */}

      {/* ---Total price--- */}
      <p className="text-[16px] font-[800] leading-[23px] mb-2">Total:</p>
      <div className="flex flex-row items-center">
        <p className="text-[#0f0f0f] text-[20px] font-[800]">
          €{calculateTotalPriceInclTax().toFixed(2)}
          <span className="text-[#7a7a7a] text-[15px] font-normal ml-1 ">
            ttc.
          </span>
        </p>
        <p className="text-[#0f0f0f] text-[17px] font-[500] ml-3">
          €{calculateTotalPriceExclTax().toFixed(2)}
          <span className="text-[#7a7a7a] text-[15px] font-normal ml-1 ">
            ht.
          </span>
        </p>
      </div>
      {/* long add to cart button  */}
      {typeof variants === "number" ? null : (
        <button
          onClick={handleAddToCart}
          className="bg-gradient-to-b from-[#255CA6] from-10% to-[#052753] to-90% h-[46px] w-full py-4 px-5 text-white border border-[#a2a2a2] mt-[11px] text-[16px] font-medium uppercase flex justify-center items-center"
        >
          Ajouter au panier
        </button>
      )}
    </div>
  );
}
