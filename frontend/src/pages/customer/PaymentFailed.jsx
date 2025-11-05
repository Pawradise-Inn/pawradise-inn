import React from "react";

const PaymentFailed = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="w-64 h-64 bg-red-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">Payment Failed</span>
      </div>
    </div>
  );
};

export default PaymentFailed;
