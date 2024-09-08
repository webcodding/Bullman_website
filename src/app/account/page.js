"use client";
import AccountInfoPage from "@/components/account/AccountInfoPage";
import LoginPage from "@/components/account/LoginPage";
import { information } from "@/config";
import AuthContext from "@/context/AuthContext";
import React, { useContext } from "react";

export default function Account() {
  const { auth } = useContext(AuthContext);
  // console.log(auth);
  return (
    <main className="">
      {auth.user !== null ? (
        <div>
          <AccountInfoPage />
        </div>
      ) : (
        <LoginPage />
      )}
    </main>
  );
}
