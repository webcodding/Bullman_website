import React from "react";

export default function TrackingSlider({ status }) {
  const checkCircle = () => (
    <div className="w-[40px] h-[40px] border-[4px] border-navyBlue bg-navyBlue rounded-[40px] flex items-center justify-center">
      <i className="fa-solid fa-check text-white text-[24px]"></i>
    </div>
  );
  const crossCircle = () => (
    <div className="w-[40px] h-[40px] border-[4px] border-[#d1d1d1] rounded-[40px] flex items-center justify-center">
      <i className="fa-solid fa-exclamation text-red-600 text-[24px]"></i>
    </div>
  );
  const normalCircle = () => (
    <div className="w-[40px] h-[40px] border-[4px] border-[#d1d1d1] rounded-[40px]"></div>
  );

  const blueLine = () => (
    <div className="h-[4px] w-1/3 mt-[17px] ml-[-32px] bg-navyBlue"></div>
  );

  const normalLine = () => (
    <div className="h-[4px] w-1/3 mt-[17px] ml-[-30px] bg-[#d1d1d1]"></div>
  );

  return (
    <div className="bg-white border my-5 pb-5">
      <div className="flex flex-row items-center justify-between pt-4 px-6">
        <p className="text-[#000] text-[16px] font-[401] mb-[25px]">
          Suivi de commande
        </p>
      </div>
      {/* row 1 */}
      <div className="flex flex-row items-start justify-center px-6">
        {/* order Recieve */}
        <div className="flex flex-col items-center">
          {checkCircle()}
          <div className="flex flex-col items-center w-[100px]">
            <img
              src="/img/track-1.webp"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] text-navyBlue">
              Order received
            </p>
          </div>
        </div>
        {blueLine()}
        {/* Ready */}
        <div className="flex flex-col items-center ml-[-30px]">
          {status === "ready" ||
          status === "partial_delivered" ||
          status === "done" ||
          status === "cancel"
            ? checkCircle()
            : normalCircle()}
          <div className="flex flex-col items-center w-[100px]">
            <img
              src="/img/track-3.webp"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] text-[#000]">
              Ready
            </p>
          </div>
        </div>
        {status === "ready" ||
        status === "partial_delivered" ||
        status === "done" ||
        status === "cancel"
          ? blueLine()
          : normalLine()}
        {/* Partial Deliver */}
        {status === "partial_delivered" && (
          <>
            <div className="flex flex-col items-center ml-[-30px]">
              {status === "partial_delivered" ||
              status === "done" ||
              status === "cancel"
                ? checkCircle()
                : normalCircle()}
              <div className="flex flex-col items-center w-[100px]">
                <img
                  src="/img/track-5.webp"
                  className="mb-2 mlg:w-[40px] mlg:h-[32px]"
                />
                <p className="font-medium text-[16px] mlg:text-[12px] text-[#000] text-center">
                  Partial Delivered
                </p>
              </div>
            </div>
            {status === "partial_delivered" ||
            status === "done" ||
            status === "cancel"
              ? blueLine()
              : normalLine()}
          </>
        )}
        {/*  Shipped */}
        <div className="flex flex-col items-center ml-[-30px]">
          {status === "done"
            ? checkCircle()
            : status === "cancel"
            ? crossCircle()
            : normalCircle()}
          <div className="flex flex-col items-center w-[100px]">
            <img
              src="/img/track-4.webp"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] text-[#000]">
              {status === "cancel" ? "Cancelled" : "Shipped"}
            </p>
          </div>
        </div>
      </div>
      {/* row 2 */}
      <div className="flex flex-row items-center px-0  w-full mt-3">
        {/* order recieved */}
        <div className="flex flex-col items-center justify-start w-1/5"></div>
        {/* item 2 */}
        {/* <div className="flex flex-col items-center justify-start w-1/5">
          
          <div className="flex flex-col items-center ml-[-50px]">
            <img
              src="/img/track-2.png"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] w-[105px] text-center text-[#000]">
              Reassort / Production on order
            </p>
          </div>
        </div> */}
        {/* Ready */}
        <div className="flex flex-col items-center justify-start w-1/5"></div>
        {/* shipped */}
        <div className="flex flex-col items-center justify-start w-1/5"></div>
        {/* item 5 */}
        {/* <div className="flex flex-col items-center justify-start w-1/5">
         
          <div className="flex flex-col items-center mr-[-100px]">
            <img
              src="/img/track-5.webp"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] text-[#000]">
              Delivered
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
