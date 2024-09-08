"use client";
import Breadcrumb from "@/utils/Breadcrumb";
import Button from "@/utils/Button";
import { registerUser } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
  const [title, setTitle] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkNewsletter, setCheckNewsLetter] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);

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

    //console.log(JSON.stringify(userData));

    try {
      const response = await registerUser(userData);
      console.log("Registration successful:", response);
      // You can save the token in local storage or state
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      //localStorage.removeItem("cartItems");
      // Redirect or update the UI as needed
      router.push("/account");
    } catch (error) {
      console.error("Error registering user:", error);
      window.alert(error);
    }
  };

  //console.log(checkPrivacy);

  return (
    <div className="px-20 font-mada mb-28 mlg:px-5 mlg:mt-16">
      <Breadcrumb slug={"Créer un compte"} />
      <p className="mt-5 flex flex-row items-start justify-start text-[1.563em] font-medium tracking-wider">
        CRÉER UN COMPTE
      </p>
      <div className="font-[500]">
        {/* Already have account */}
        <div className="mt-7 flex flex-row items-start justify-start ">
          <p>Vous avez déjà un compte ? </p>
          <Link href="/account" className="text-[#414141]">
            Connectez-vous
          </Link>
        </div>
        {/* title */}
        <p className="mt-9 flex flex-row items-start justify-start ">Titre</p>
        <div className="mt-2 flex flex-row items-center space-x-4">
          <label className="flex items-center pr-10">
            <input
              type="radio"
              name="title"
              value="M"
              checked={title === "M"}
              onChange={handleTitleChange}
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
              onChange={handleTitleChange}
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
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="p-3.5 border border-gray-300 w-full placeholder-transparent"
          />
          <p className=" italic text-[#6c6c6c] text-[.875rem]">
            Seules les lettres et le point (.), suivi d'un espace, sont
            autorisés.
          </p>
        </div>
        {/* Last name */}
        <div className=" mt-9 ">
          <label className="text-[1.063em]">Nom</label>
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="p-3.5 border border-gray-300 w-full placeholder-transparent"
          />
          <p className=" italic text-[#6c6c6c] text-[.875rem]">
            Seules les lettres et le point (.), suivi d'un espace, sont
            autorisés.
          </p>
        </div>
        {/* Email */}
        <div className=" mt-9 ">
          <label className="text-[1.063em]">E-mail</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3.5 border border-gray-300 w-full placeholder-transparent"
          />
        </div>
        {/* password */}
        <div className=" mt-9 ">
          <label className="text-[1.063em]">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3.5 border border-gray-300 w-full placeholder-transparent"
          />
        </div>
        {/* Newsletter checkbox */}
        <div className="mt-9">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={checkNewsletter}
              onChange={(e) => setCheckNewsLetter(e.target.checked)}
            />
            <span>Recevoir notre newsletter</span>
          </label>
          <p className=" mt-2 ml-3 italic text-[#6c6c6c]  text-[.875rem]">
            Vous pouvez vous désinscrire à tout moment. Vous trouverez pour cela
            nos informations de contact dans les conditions d'utilisation du
            site.
          </p>
        </div>
        {/* privacy checkbox */}
        <div className="mt-9">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={checkPrivacy}
              onChange={(e) => setCheckPrivacy(e.target.checked)}
            />
            <span>
              J'accepte les conditions générales et la politique de
              confidentialité
            </span>
          </label>
        </div>
        <div className="flex flex-row justify-end mt-12">
          <Button title={"SAUVEGARDER"} onclick={handleRegister} />
        </div>
      </div>
    </div>
  );
}
