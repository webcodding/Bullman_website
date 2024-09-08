import Breadcrumb from "@/utils/Breadcrumb";

export default function Address() {
  return (
    <main className="flex min-h-screen flex-col font-mada px-20">
      <p className="mt-[102px] flex flex-row items-start text-[1.563em] font-medium tracking-wider">
        NEW ADDRESS
      </p>
      <div className="py-10 flex flex-col">
        <div className="relative mb-7">
          <label className=" font-medium text-[1.063rem] flex flex-row items-end ">
            Alias
          </label>
          <input
            type="text"
            className="p-3 border border-gray-300 w-full placeholder-transparent"
          />
          <span className="absolute inset-y-0 right-8 flex items-center pt-6 italic text-gray-500">
            Optional
          </span>
        </div>

        <label className=" font-medium text-[1.063rem] flex flex-row items-end">
          First name
        </label>
        <input type="text" className="mb-7 p-3 border border-gray-300 w-full" />

        <label className=" font-medium text-[1.063rem] flex flex-row items-end ">
          Last name
        </label>
        <input type="text" className="mb-7 p-3 border border-gray-300 w-full" />

        <div className="relative mb-7">
          <label className=" font-medium text-[1.063rem] flex flex-row items-end">
            Company
          </label>
          <input
            type="text"
            className="p-3 border border-gray-300 w-full placeholder-transparent"
          />
          <span className="absolute inset-y-0 right-8 flex items-center pt-6 italic text-gray-500">
            Optional
          </span>
        </div>

        <div className="relative mb-7">
          <label className=" font-medium text-[1.063rem] flex flex-row items-end ">
            VAT number
          </label>
          <input
            type="text"
            className="p-3 border border-gray-300 w-full placeholder-transparent"
          />
          <span className="absolute inset-y-0 right-8 flex items-center pt-6 italic text-gray-500">
            Optional
          </span>
        </div>

        <label className=" font-medium text-[1.063rem] flex flex-row items-end">
          Address
        </label>
        <input type="text" className="mb-7 p-3 border border-gray-300 w-full" />

        <div className="relative mb-7">
          <label className=" font-medium text-[1.063rem] flex flex-row items-end">
            Address Complement
          </label>
          <input
            type="text"
            className="p-3 border border-gray-300 w-full placeholder-transparent"
          />
          <span className="absolute inset-y-0 right-8 flex items-center pt-6 italic text-gray-500">
            Optional
          </span>
        </div>

        <label className=" font-medium text-[1.063rem] flex flex-row items-end">
          Zip/Postal Code
        </label>
        <input type="text" className="mb-7 p-3 border border-gray-300 w-full" />

        <label className=" font-medium text-[1.063rem] flex flex-row items-end">
          City
        </label>
        <input type="text" className="mb-7 p-3 border border-gray-300 w-full" />

        <label className=" font-medium text-[1.063rem] flex flex-row items-end ">
          Country
        </label>
        <select className="mb-7 p-3 border border-gray-300 w-full">
          <option>France</option>
          {/* Add more options here if needed */}
        </select>

        <label className=" font-medium text-[1.063rem] flex flex-row items-end">
          Phone
        </label>
        <input type="text" className="mb-7 p-3 border border-gray-300 w-full" />

        <div className="flex flex-row items-end justify-end pt-2">
          <button className="px-6 py-[9px] bg-navyBlue hover:bg-darkSlate text-white border-2 border-black text-[13px] uppercase">
            SAVE
          </button>
        </div>
      </div>
    </main>
  );
}
