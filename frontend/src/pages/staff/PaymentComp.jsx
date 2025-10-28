// import { useEffect, useState } from "react";
// import PaymentCard from "../../components/staff/PaymentCard"

// const PaymentComp = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-64 h-64 bg-red-500">
//         {/* This is your red square */}
//       </div>
//     </div>
//   );
// };

// export default PaymentComp;

import { useEffect, useState } from "react";
import PaymentCard from "../../components/staff/PaymentCard"

const PaymentComp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <PaymentCard />
    </div>
  );
};

export default PaymentComp;