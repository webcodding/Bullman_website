"use client";
import SearchBar from "@/utils/SearchBar";
import { navbarAccountLinks, smallDeviceCategories } from "@/config";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartModal from "./CartModal";
import { fetchFromBackend } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredNav, setHoveredNav] = useState(null);
  const [userIconHovered, setUserIconHovered] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [clickBar, setClickBar] = useState(false);
  const [headerCategories, setHeaderCategories] = useState([]);
  const [shopCategories, setShopCategories] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [showSearchProduct, setShowSearchProduct] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    if (showCart) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showCart]);

  useEffect(() => {
    const fetchData = async () => {
      const headerData = await fetchFromBackend("/categories/header");
      setHeaderCategories(headerData);
      //console.log("Header Categories:", headerData);

      const shopData = await fetchFromBackend("/categories/shop");
      setShopCategories(shopData);
      // console.log("Shop Categories:", shopData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (searchQuery !== "") {
        const searchData = await fetchFromBackend(
          `/search/product/${searchQuery}`
        );
        setSearchProducts(searchData || []);
        console.log(searchData);
      }
    };

    const debounceFetch = setTimeout(fetchSearchData, 500);

    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  const handleMouseEnter = (index) => {
    setHoveredNav(index);
  };

  const handleMouseLeave = () => {
    setHoveredNav(null);
  };
  const handleUserIconMouseEnter = () => {
    setUserIconHovered(true);
  };

  const handleUserIconMouseLeave = () => {
    setUserIconHovered(false);
  };

  return (
    <>
      <div className="fixed z-50 left-0 top-0 right-0 font-mada">
        {/* Extra top navbar */}
        <div className=" bg-white w-full h-9 flex flex-row items-center justify-end stm:justify-center text-[15px] xsm:text-[12px] sm:[12px] ">
          <a
            href="/content/nos-realisations"
            className="mx-6 xsm:mx-2 sm:mx-2 hover:underline"
          >
            Nos réalisations
          </a>
          {/* <a href="/" className="mx-6 xsm:mx-2 sm:mx-2 hover:underline">
            Cartes Cadeau
          </a> */}
          <a
            href="/contactez-nous"
            className="mx-6 xsm:mx-2 sm:mx-2 hover:underline"
          >
            Contactez-Nous
          </a>
          <a
            href="/order-detail"
            className="ml-6 xsm:mx-2 sm:mx-2 hover:underline mr-16"
          >
            Statut commande
          </a>
        </div>
        <div className="flex flex-col justify-center bg-black text-white px-3 font-mada ">
          {/*---------- Top Navbar ------------- */}
          <div className="grid mtl:grid mtl:grid-cols-3  stm:grid-cols-1 dmd:grid-cols-2 gap-4 px-16 py-5 smd:grid-cols-2 stm: justify-center stm:items-center">
            {/* Logo */}
            <a
              href="/"
              className=" stm:flex stm: flex-row stm: justify-center "
            >
              <img
                src="/img/logo2.webp"
                alt="logo"
                className="w-[200px] h-[42.24px] "
              />
            </a>
            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              searchProducts={searchProducts}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchProducts([]);
              }}
              onclick={() => setShowSearchProduct((prev) => !prev)}
            />

            {/* right conetnts */}
            <div className="flex flex-row stm:hidden dmd:hidden items-center justify-center ml-10 smd:hidden ">
              <div className="mr-5">
                <div className="bg-navyBlue px-1 py-[3px] flex flex-row justify-center items-center">
                  <p className="text-[13px]">
                    LIVRAISON OFFERTE À PARTIR DE 500€{" "}
                  </p>
                  <i className="fa-solid fa-chevron-right ml-2 text-[10px]"></i>
                </div>
                <div className="text-navyBlue  flex flex-row justify-center items-center my-1 cursor-pointer">
                  <p className="text-[13px]">
                    ET SUR UNE SÉLECTION D'ARTICLES : ICI{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="fa-solid fa-unlock-keyhole mx-3 cursor-pointer text-[12px]"></i>
                {/* User account links */}
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={handleUserIconMouseEnter}
                  onMouseLeave={handleUserIconMouseLeave}
                >
                  <i className="fa-regular fa-user mx-3 text-[12px]"></i>
                  {userIconHovered && (
                    <div className="absolute right-0 top-[75%] bg-white text-black mt-1 shadow-lg z-50 w-[220px]">
                      {navbarAccountLinks.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="block px-4 py-3 hover:bg-[#404040] hover:text-white text-[13px] uppercase"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {/* cart icon */}
                <div
                  className="relative cursor-pointer ml-3"
                  onClick={() => setShowCart((prevOpen) => !prevOpen)}
                >
                  <i className="fa-solid fa-cart-shopping  text-[12px]"></i>
                  {cartItems.length > 0 ? (
                    <div className="absolute top-1 left-4 font-bold  text-navyBlue rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {"("}
                      {cartItems.length}
                      {")"}
                    </div>
                  ) : (
                    <div className="absolute top-1 left-4 font-bold  text-navyBlue rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {"("}0{")"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* -------------------------------- */}
          {/*---------- Bottom Navbar ------------- */}
          <div className="flex flex-row items-center justify-center w-full stm:hidden dmd:hidden ">
            {/* shop box */}
            <div
              className="bg-navyBlue uppercase  text-[16px] xmd:text-[13px] xlg:mx-3 xmd:mx-2 py-3 px-6 font-bold text-white cursor-pointer "
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              <p>Shop</p>
              {/* shopCategories */}
              {hoveredNav === 0 && (
                <div className="absolute left-[35px] xmd:left-[10px] top-full bg-white text-black mt-[2px] xmd:mt-[-4px] shadow-lg">
                  {shopCategories.map((item, subIndex) => (
                    <Link
                      href={{
                        pathname: `/filter`,
                        query: { category: JSON.stringify(item) },
                      }}
                      key={subIndex}
                      className="block px-4 py-1 my-3 tracking-[1px] text-[14px] hover:bg-navyBlue hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {headerCategories.length > 0 &&
              headerCategories.map((navs, index) => (
                <div
                  key={index}
                  className={`uppercase  text-[14px] dlg:text-[10px] xmd:text-[12px] xlg:mx-1 xmd:mx-0 py-3 px-2 font-bold  cursor-pointer hover:text-navyBlue`}
                >
                  <Link
                    href={{
                      pathname: `/filter`,
                      query: { category: JSON.stringify(navs) },
                    }}
                  >
                    {navs.name}
                  </Link>
                </div>
              ))}
            <div className="bg-navyBlue uppercase  text-[16px] xmd:text-[13px] xlg:mx-3 xmd:mx-2 py-3 px-6 font-bold text-white cursor-pointer">
              <Link href={"/packs"}>
                <p>Pack</p>
              </Link>
            </div>
          </div>
          {/* for small device  */}
          <div className="flex flex-row items-center justify-center w-full mtl:hidden ">
            <i
              className="fa-solid fa-bars dmd:mr-24 mr-7 pb-3 cursor-pointer text-[18px]"
              onClick={() => setClickBar((prevOpen) => !prevOpen)}
            ></i>
            {clickBar && (
              <div className="absolute right-0 left-5 top-[95%] bg-white text-black mt-1 shadow-lg z-50 w-4/5 h-[300px] overflow-y-scroll ">
                {headerCategories.map((navs, index) => (
                  <Link
                    href={{
                      pathname: `/filter`,
                      query: { category: JSON.stringify(navs) },
                    }}
                    key={index}
                    className="block px-4 py-3 hover:bg-[#404040] hover:text-white text-[13px] uppercase"
                  >
                    {navs.name}
                  </Link>
                ))}
                {shopCategories.map((navs, index) => (
                  <Link
                    href={{
                      pathname: `/filter`,
                      query: { category: JSON.stringify(navs) },
                    }}
                    key={index}
                    className="block px-4 py-3 hover:bg-[#404040] hover:text-white text-[13px] uppercase"
                  >
                    {navs.name}
                  </Link>
                ))}
              </div>
            )}

            <i className="fa-solid fa-unlock-keyhole dmd:mx-24 mx-7 pb-3 cursor-pointer text-[18px]"></i>
            {/* User account links */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={handleUserIconMouseEnter}
              onMouseLeave={handleUserIconMouseLeave}
            >
              <i className="fa-regular fa-user dmd:mx-24 mx-7 pb-3 text-[18px]"></i>
              {userIconHovered && (
                <div className="absolute right-0 top-[75%] bg-white text-black mt-1 shadow-lg z-50 w-[220px]">
                  {navbarAccountLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="block px-4 py-3 hover:bg-[#404040] hover:text-white text-[13px] uppercase"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {/* cart icon */}
            <div
              className="relative cursor-pointer"
              onClick={() => setShowCart((prevOpen) => !prevOpen)}
            >
              <i className="fa-solid fa-cart-shopping dmd:ml-24 ml-7 pb-3 text-[18px]"></i>

              {cartItems.length > 0 ? (
                <div className="absolute top-1 left-12 dmd:left-[120px] font-bold  text-navyBlue rounded-full w-5 h-5 flex items-center justify-center text-[13px]">
                  {"("}
                  {cartItems.length}
                  {")"}
                </div>
              ) : (
                <div className="absolute top-1 left-12 dmd:left-[120px] font-bold  text-navyBlue rounded-full w-5 h-5 flex items-center justify-center text-[13px]">
                  {"("}0{")"}
                </div>
              )}
            </div>
          </div>
          {/* ======= */}
          {/* Cart Modal */}
          {showCart && (
            <CartModal showCart={showCart} setShowCart={setShowCart} />
          )}
        </div>
        {/* Search Modal */}
        {searchQuery !== "" ? (
          <SearchModal
            searchProducts={searchProducts}
            searchQuery={searchQuery}
            onclick={() => setSearchQuery("")}
          />
        ) : null}
      </div>
    </>
  );
}
