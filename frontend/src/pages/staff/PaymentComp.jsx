import { useEffect, useState } from "react";
import PaymentCard from "../../components/staff/PaymentCard";

const PaymentComp = () => {
  return (
    <div className="mt-8 flex flex-col items-start px-0">
      <b className="text-4xl mb-2 text-[var(--dark-brown-color)]">
        Manage Payment
      </b>
      <hr className="lg:w-290 md:w-175 sm:w-100 border-1 border-[var(--brown-color)] mt-2 mb-1" />

      <div className="flex flex-wrap items-center gap-4 w-full px-4">
        <div className="flex flex-1 min-w-[200px] max-w-[600px] my-4 border-2 rounded-4xl px-5 py-2 text-xl">

          <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center"></i>
          <input
            className="w-full outline-0 placeholder:opacity-75"
            placeholder="search"
            // onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 my-4">
          <label className="relative flex items-center space-x-2 cursor-pointer font-semibold">
            <input
              type="checkbox"
              value="book"
              // onChange={handleCheckboxChange}
              className="hidden peer"
            />
            <div
              className="relative w-8 h-8 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)] 
                          before:absolute before:top-1/2 before:left-1/2 before:w-6 before:h-0.5 before:bg-[var(--dark-brown-color)] 
                          before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform 
                          before:transition-all before:scale-0 peer-checked:before:scale-100"
            ></div>
            <span>Success</span>
          </label>

          <label className="relative flex items-center space-x-2 cursor-pointer font-semibold">
            <input
              type="checkbox"
              value="service"
              // onChange={handleCheckboxChange}
              className="hidden peer"
            />
            <div
              className="relative w-8 h-8 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)]
                          before:absolute before:top-1/2 before:left-1/2 before:w-6 before:h-0.5 before:bg-[var(--dark-brown-color)] 
                          before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform 
                          before:transition-all before:scale-0 peer-checked:before:scale-100"
            ></div>
            <span>Failed</span>
          </label>

          <label className="relative flex items-center space-x-2 cursor-pointer font-semibold">
            <input
              type="checkbox"
              value="service"
              // onChange={handleCheckboxChange}
              className="hidden peer"
            />
            <div
              className="relative w-8 h-8 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)]
                          before:absolute before:top-1/2 before:left-1/2 before:w-6 before:h-0.5 before:bg-[var(--dark-brown-color)] 
                          before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform 
                          before:transition-all before:scale-0 peer-checked:before:scale-100"
            ></div>
            <span>Cancelled</span>
          </label>
        </div>
      </div>

      <div className="w-full ml-0">
        <PaymentCard />
      </div>
    </div>
  );
};

export default PaymentComp;
