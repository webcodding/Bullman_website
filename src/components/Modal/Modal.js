import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-black border border-[#acacad] w-[400px] h-[80vh] p-5 rounded-[4px] max-w-md mx-auto shadow-[#414040] shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-[20px] right-[20px] text-white hover:text-gray-500"
        >
          <i className="fa-solid fa-xmark text-[28px]"></i>
        </button>

        {children}
      </div>
    </div>
  );
}
