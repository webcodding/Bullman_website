"use client";
import Breadcrumb from "@/utils/Breadcrumb";
import Button from "@/utils/Button";
import { loginUser } from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegisterButton = () => {
    //console.log("Register button clicked");
    router.push("/register");
  };

  const handleLogin = async () => {
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await loginUser(userData);
      console.log("Login successful:", response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      //localStorage.removeItem("cartItems");
      router.push("/");
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <div className="px-20 mlg:px-5 mlg:my-10">
      <Breadcrumb slug={"Connectez-vous à votre compte"} />
      <div className="grid grid-cols-2 mlg:grid-cols-1 gap-24 items-center mt-4 pr-6">
        {/* Left Content */}
        <div className="text-left">
          <h3 className="text-[#333] text-[1.563em] font-[600] mb-[35px] uppercase tracking-[.1em] font-mada ">
            NOUVEAUX CLIENTS
          </h3>
          <p className="text-[#444] text-[16px] mb-[1.5em] font-medium leading-[1.5em] tracking-wide ">
            En créant un compte sur notre boutique, vous pourrez passer vos
            commandes plus rapidement, enregistrer plusieurs adresses de
            livraison, visualiser et suivre vos commandes sur votre compte et
            plus encore.
          </p>
          {/* Go to Register Button */}
          <Button title={"Créer un compte"} onclick={handleRegisterButton} />
        </div>
        {/* --------- */}
        {/* Right Content */}
        <div className="">
          <h3 className="text-[#333] text-[1.563em] font-[600] mb-[35px] uppercase tracking-[.1em] font-mada ">
            CONNECTEZ-VOUS À VOTRE COMPTE
          </h3>
          {/* Email */}
          <div className="border border-[#d1d1d1] px-5 bg-white flex flex-row items-center mb-5">
            <i class="fa-regular fa-envelope text-[#5f5f5f] text-[15px]"></i>
            <input
              placeholder="E-mail"
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[#5f5f5f] text-[16px] py-[14px] px-[1.25rem] pl-2 w-full font-[401] outline-none "
            />
          </div>
          {/* password */}
          <div className="border border-[#d1d1d1] px-5 bg-white flex flex-row items-center mb-5">
            <i class="fa-solid fa-key text-[#5f5f5f] text-[15px]"></i>
            <input
              placeholder="Mot de passe"
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-[#5f5f5f] text-[16px] py-[14px] px-[1.25rem] pl-2 w-full font-[401] outline-none "
            />
          </div>
          <div className="flex flex-row items-center justify-end">
            {/* forget Password page link */}
            <p className="text-[#bdbdbd] text-[14px] font-medium px-[15px] ">
              Oublié votre mot de passe ?
            </p>
            <Button title={"S'identifier"} onclick={handleLogin} />
          </div>
        </div>
        {/* --------- */}
      </div>
    </div>
  );
}
