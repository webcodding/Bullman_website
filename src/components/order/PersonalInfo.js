// PersonalInfo.js
"use client";
import AuthContext from "@/context/AuthContext";
import Button from "@/utils/Button";
import { loginUser, registerUser } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";

function GuestCheckout({ onContinue, personalInfo, setPersonalInfo }) {
  // console.log(personalInfo);
  const {
    title,
    fname,
    lname,
    email,
    password,
    checkNewsletter,
    checkPrivacy,
  } = personalInfo;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleRegister = async () => {
    const userData = {
      title: title,
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      newsletter: checkNewsletter,
      privacy: checkPrivacy,
    };

    try {
      const response = await registerUser(userData);
      console.log("Registration successful:", response);
      // You can save the token in local storage or state
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      onContinue();
    } catch (error) {
      console.error("Error registering user:", error);
      window.alert(error);
    }
  };
  return (
    <div className="pr-20">
      {/* title */}
      <p className="mt-9 flex flex-row items-start justify-start ">Titre</p>
      <div className="mt-2 flex flex-row items-center space-x-4">
        <label className="flex items-center pr-10">
          <input
            type="radio"
            name="title"
            value="M"
            checked={title === "M"}
            onChange={handleInputChange}
            className="radio-custom"
          />
          <span className="ml-2">M</span>
        </label>
        <label className="flex items-center ">
          <input
            type="radio"
            name="title"
            value="Mme"
            checked={title === "Mme"}
            onChange={handleInputChange}
            className="radio-custom"
          />
          <span className="ml-2">Mme</span>
        </label>
      </div>

      {/* First name */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">Prénom</label>
        <input
          type="text"
          name="fname"
          value={fname}
          onChange={handleInputChange}
          className="p-3.5 border border-gray-300 w-full placeholder-transparent"
        />
        <p className=" italic text-[#6c6c6c] text-[.875rem]">
          Seules les lettres et le point (.), suivi d'un espace, sont autorisés.
        </p>
      </div>
      {/* Last name */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">Nom</label>
        <input
          type="text"
          name="lname"
          value={lname}
          onChange={handleInputChange}
          className="p-3.5 border border-gray-300 w-full placeholder-transparent"
        />
        <p className=" italic text-[#6c6c6c] text-[.875rem]">
          Seules les lettres et le point (.), suivi d'un espace, sont autorisés.
        </p>
      </div>
      {/* Email */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">E-mail</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="p-3.5 border border-gray-300 w-full placeholder-transparent"
        />
      </div>
      <p className="mt-5 flex flex-row items-start justify-start text-[1.125em] font-medium tracking-wider">
        CRÉER UN COMPTE{" "}
        <span className="italic text-[#ababab] text-[.938em]">
          (facultatif)
        </span>
      </p>
      {/* password */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">Mot de passe</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="p-3.5 border border-gray-300 w-full placeholder-transparent"
        />
      </div>
      {/* Newsletter checkbox */}
      <div className="mt-9">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="checkNewsletter"
            checked={checkNewsletter}
            onChange={handleInputChange}
          />
          <span>Recevoir notre newsletter</span>
        </label>
        <p className=" mt-2 ml-3 text-[#6c6c6c] italic text-[.875rem]">
          Vous pouvez vous désinscrire à tout moment. Vous trouverez pour cela
          nos informations de contact dans les conditions d'utilisation du site.
        </p>
      </div>
      {/* privacy checkbox */}
      <div className="mt-9">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="checkPrivacy"
            checked={checkPrivacy}
            onChange={handleInputChange}
          />
          <span>
            J'accepte les conditions générales et la politique de
            confidentialité
          </span>
        </label>
      </div>
      <div className="flex flex-row justify-end my-2">
        <Button title={"Continue"} onclick={handleRegister} />
      </div>
    </div>
  );
}

function Login({ onContinue, loginInfo, setLoginInfo }) {
  const { email, password } = loginInfo;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      onContinue();
      //router.push("/");
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <div className="pr-20">
      {/* Email */}
      <div className="border border-[#d1d1d1] px-5 bg-white flex flex-row items-center mb-5">
        <input
          placeholder="E-mail"
          type={"email"}
          name="email"
          value={email}
          onChange={handleInputChange}
          className="text-[#5f5f5f] text-[16px] py-[14px] px-[1.25rem] pl-2 w-full font-[401] outline-none "
        />
      </div>
      {/* password */}
      <div className="border border-[#d1d1d1] px-5 bg-white flex flex-row items-center mb-5">
        <input
          placeholder="Mot de passe"
          type={"password"}
          name="password"
          value={password}
          onChange={handleInputChange}
          className="text-[#5f5f5f] text-[16px] py-[14px] px-[1.25rem] pl-2 w-full font-[401] outline-none "
        />
      </div>
      {/* forget Password page link */}
      <p className="text-[#bdbdbd] text-[14px] font-medium px-[15px] ">
        Oublié votre mot de passe ?
      </p>
      <div className="flex flex-row items-center justify-end">
        <Button title={"Continue"} onclick={handleLogin} />
      </div>
    </div>
  );
}

export default function PersonalInfo({
  onContinue,
  enabledTabs,
  setEnabledTabs,
  personalInfo,
  setPersonalInfo,
  loginInfo,
  setLoginInfo,
}) {
  const [activeTab, setActiveTab] = useState("guest");
  const { auth, logout } = useContext(AuthContext);

  useEffect(() => {
    if (auth.user) {
      setEnabledTabs((prev) => ({ ...prev, addresses: true }));
    }
  }, []);

  return (
    <div className="">
      {auth.user ? (
        <>
          <div className="flex flex-row items-center mb-4">
            <p className="text-[16px] text-black font-medium mr-1">
              Connecté comme
            </p>
            <Link
              href="/account"
              className="text-[16px] text-[#333] font-normal cursor-pointer"
            >
              {auth.user.fname} {auth.user.lname}
            </Link>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-[16px] text-black font-medium mr-1">
              Pas vous ?
            </p>
            <div
              className="text-[16px] text-[#333] font-normal cursor-pointer"
              onClick={() => logout()}
            >
              {" "}
              Déconnexion.
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row">
            <button
              onClick={() => setActiveTab("guest")}
              className={`text-[15px] ${
                activeTab === "guest"
                  ? "border border-navyBlue text-navyBlue"
                  : "text-[#a8a8a8]"
              } py-[6px] px-[12px] font-medium `}
            >
              Commander en tant qu'invité
            </button>
            <span className="text-[#a8a8a8] text-[22px] mx-[1rem] ">|</span>
            <button
              onClick={() => setActiveTab("login")}
              className={`text-[15px] ${
                activeTab === "login"
                  ? "border border-navyBlue text-navyBlue"
                  : "text-[#a8a8a8]"
              } py-[6px] px-[12px] font-medium `}
            >
              S'identifier
            </button>
          </div>
          <div style={{ marginTop: "20px" }}>
            {activeTab === "guest" ? (
              <GuestCheckout
                onContinue={onContinue}
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
              />
            ) : (
              <Login
                onContinue={onContinue}
                loginInfo={loginInfo}
                setLoginInfo={setLoginInfo}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
