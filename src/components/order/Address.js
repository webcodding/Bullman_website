// Addresses.js
import { countries } from "@/config";
import Button from "@/utils/Button";
import React, { useEffect, useState } from "react";

export default function Addresses({ onContinue, allAddress, setAllAddress }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [company, setCompany] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [address, setAddress] = useState("");
  const [aditionalAddress, setAdditionalAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("France");
  const [checkBillingAddress, setCheckBilling] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [totalAddress, setTotalAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const storedAddresses = getStoredAddresses();
    if (storedAddresses.length > 0) {
      setTotalAddress(storedAddresses);
      setSelectedAddress(storedAddresses[0]);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = () => {
    if (
      fname !== "" &&
      lname !== "" &&
      address !== "" &&
      postalCode !== "" &&
      city !== "" &&
      phone !== ""
    ) {
      const newAddress = {
        fname: fname,
        lname: lname,
        address: address,
        postalCode: postalCode,
        city: city,
        country: country,
        phone: phone,
      };
      localStorage.setItem("deliverAddress", JSON.stringify(newAddress));
      const updatedAddresses = [...totalAddress, newAddress];
      setTotalAddress(updatedAddresses);
      localStorage.setItem("allAddresses", JSON.stringify(updatedAddresses));
      setSelectedAddress(newAddress);
      setShowAddressForm(false);
    } else {
      window.alert("Please fill in the required fields!");
    }
  };

  const handleAddressSubmit = () => {
    onContinue();
    setAllAddress({
      deliver_address: selectedAddress,
      billing_address: selectedAddress,
    });
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = totalAddress.filter((_, i) => i !== index);
    setTotalAddress(updatedAddresses);

    // Update localStorage
    localStorage.setItem("allAddresses", JSON.stringify(updatedAddresses));

    if (updatedAddresses.length > 0) {
      setSelectedAddress(updatedAddresses[0]);
    } else {
      setSelectedAddress(null);
      localStorage.removeItem("deliverAddress");
    }
  };

  const getStoredAddresses = () => {
    const storedAddresses = localStorage.getItem("allAddresses");
    return storedAddresses ? JSON.parse(storedAddresses) : [];
  };

  //console.log(selectedAddress);

  return (
    <>
      {!showAddressForm && totalAddress.length > 0 ? (
        <div className=" mb-10 ">
          <div className="border border-[#f1f1f1] p-[22px]">
            <h3 className="text-[16px] text-[#000] font-medium mb-3">
              L'adresse sélectionnée sera utilisée à la fois comme adresse
              personnelle (pour la facturation) et comme adresse de livraison.
            </h3>
            {/* Select Address */}
            <div className="grid grid-cols-2 gap-4">
              {totalAddress.map((item, index) => (
                <label className="border border-[#d2d2d2] flex flex-row p-3 rounded-[7px] text-[15px] font-medium text-[#414141] shadow-md shadow-[#0000000f]">
                  <input
                    type="radio"
                    value={item}
                    checked={selectedAddress === item}
                    onChange={() => setSelectedAddress(item)}
                    className="radio-custom"
                  />
                  <div className="flex flex-col">
                    <p>
                      {item.fname} {item.lname}
                    </p>
                    <p>{item.address}</p>
                    <p>
                      {item.postalCode} {item.city}
                    </p>
                    <p>{item.country}</p>
                    <p>{item.phone}</p>
                    {/* Delete single Address */}
                    <p
                      className="text-[15px] text-[#ababab] font-medium mt-3 cursor-pointer"
                      onClick={() => handleDeleteAddress(index)}
                    >
                      <i class="fa-solid fa-xmark mt-2"></i> Supprimer
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {/* Add more address button */}
            <div
              className="flex flex-row items-center my-3 cursor-pointer"
              onClick={() => setShowAddressForm(true)}
            >
              <i class="fa-solid fa-plus text-[18px] text-[#ababab] mr-2"></i>
              <p>Ajouter une nouvelle adresse</p>
            </div>
            <p>L'adresse de facturation diffère de l'adresse de livraison </p>
            <div className="mt-5 flex flex-row justify-end">
              <Button title={"Continue"} onclick={handleAddressSubmit} />
            </div>
          </div>
        </div>
      ) : showAddressForm || totalAddress.length === 0 ? (
        <>
          {/* Address form */}
          <div>
            <h3 className="">
              L'adresse sélectionnée sera utilisée à la fois comme adresse
              personnelle (pour la facturation) et comme adresse de livraison.
            </h3>
            {/* First name */}
            <div className=" mt-9 ">
              <label className="text-[1.063em]">Prénom</label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
                required
              />
            </div>
            {/* Last name */}
            <div className=" mt-9 ">
              <label className="text-[1.063em]">Nom</label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
                required
              />
            </div>
            {/* company */}
            <div className=" mt-9 relative">
              <label className="text-[1.063em]">Société</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
              />
              <p className="italic text-[#6c6c6c] text-[13px] absolute bottom-2 right-8">
                Optionnel
              </p>
            </div>
            {/* vat number */}
            <div className=" mt-9 relative">
              <label className="text-[1.063em]">Numéro de TVA</label>
              <input
                type="text"
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
              />
              <p className="italic text-[#6c6c6c] text-[13px] absolute bottom-2 right-8">
                Optionnel
              </p>
            </div>
            {/* Address */}
            <div className=" mt-9 ">
              <label className="text-[1.063em]">Adresse</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
                required
              />
            </div>
            {/* Additional Address */}
            <div className=" mt-9 relative">
              <label className="text-[1.063em]">Complément d'adresse</label>
              <input
                type="text"
                value={aditionalAddress}
                onChange={(e) => setAdditionalAddress(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
              />
              <p className="italic text-[#6c6c6c] text-[13px] absolute bottom-2 right-8">
                Optionnel
              </p>
            </div>
            {/* Postal code */}
            <div className=" mt-9 ">
              <label className="text-[1.063em]">Code postal</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
                required
              />
            </div>
            {/* City */}
            <div className=" mt-9 ">
              <label className="text-[1.063em]">Ville</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
                required
              />
            </div>
            {/* country */}
            <div className="mt-9">
              <label className="text-[1.063em]">Pays</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
              >
                <option value="">-- Choisissez s'il vous plaît --</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* phone */}
            <div className=" mt-9 ">
              <label className="text-[1.063em]">Téléphone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
                required
              />
            </div>
            <div className="mt-5">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="checkBillingAddress"
                  checked={checkBillingAddress}
                  onChange={handleInputChange}
                />
                <span className="ml-3">
                  Utilisez également cette adresse pour la facturation
                </span>
              </label>
            </div>
            <div className="mt-5 flex flex-row items-center">
              <Button title={"Continue"} onclick={handleFormSubmit} />
              <div className="ml-3">
                <Button
                  title={"Annuler"}
                  onclick={() => setShowAddressForm(false)}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
