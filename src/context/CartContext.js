"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { fetchUserCart, updateUserCart, removeUserCartItem } from "@/utils/api";
import AuthContext from "./AuthContext";

const CartContext = createContext();

const initialState = {
  cartItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems")) || []
      : [],
};

const cartReducer = (state, action) => {
  const { auth } = useContext(AuthContext);
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.uniqueKey === newItem.uniqueKey
      );

      let updatedCartItems;
      if (existingItemIndex !== -1) {
        // Update the quantity of the existing item
        updatedCartItems = [...state.cartItems];
        // updatedCartItems[existingItemIndex] = {
        //   ...updatedCartItems[existingItemIndex],
        //   quantity:
        //     updatedCartItems[existingItemIndex].quantity + newItem.quantity,
        // };
        updatedCartItems[existingItemIndex] = newItem;
      } else {
        // Add new item to the cart
        updatedCartItems = [...state.cartItems, newItem];
      }

      if (!auth.token) {
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
      return { ...state, cartItems: updatedCartItems };
    }

    case "REMOVE_FROM_CART": {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.uniqueKey !== action.payload
      );

      if (!auth.token) {
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
      return { ...state, cartItems: updatedCartItems };
    }

    case "LOAD_USER_CART": {
      return { ...state, cartItems: action.payload };
    }

    case "SET_LOADING": {
      return { ...state, isLoading: action.payload };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.token) {
      // Fetch user cart items when the token is available
      fetchUserCart(auth.token).then((data) => {
        if (data) {
          dispatch({ type: "LOAD_USER_CART", payload: data });
        }
        setIsLoading(false); // Set loading to false once data is fetched
      });
    } else {
      setIsLoading(false); // Ensure loading is set to false if no token
    }
  }, [auth.token]);

  useEffect(() => {
    if (auth.token && !isLoading) {
      // Update user cart items on state change and not during loading
      updateUserCart(auth.token, state.cartItems);
    } else if (!auth.token) {
      // Store cart items in local storage for guest users
      //  dispatch({ type: "REMOVE_FROM_CART", payload: [] });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }
  }, [state.cartItems, auth.token, isLoading]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = async (uniqueKey) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: uniqueKey });
    if (auth.token) {
      await removeUserCartItem(auth.token, uniqueKey);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems: state.cartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
