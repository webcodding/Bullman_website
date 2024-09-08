import React from "react";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/33666284497" // WhatsApp link with the number
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Security best practices
      className="flex items-center justify-center p-3 bg-[#69ca3b] rounded-[50px] fixed bottom-[20px] left-[20px] z-30 shadow-md"
    >
      <i className="fa-brands fa-whatsapp font-bold text-[40px] text-white"></i>
    </a>
  );
}
