import PaymentHistoryCard from "./paymentcomponent"
import { fetchMyPayments } from "../../../hooks/paymentAPI"
import { useEffect, useState } from "react";

const PaymentHistory = () => {
    const [payment,setPayment] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      const loadPaymentHistory = async () => {
        try{
          setLoading(true)

          const paymentHistory = await fetchMyPayments()
          console.log(paymentHistory)

          if (paymentHistory.success && paymentHistory.data){
            setPayment(paymentHistory.data)
          }
        }
        catch(error){
          console.error("Failed to load payment historys", error)
        } 
        finally {
          setLoading(false)
        }
      };
      loadPaymentHistory()
    },[])

    if (loading) {
      return(
        <div className="justify-center">
          Loading Payment Historys...
        </div>
      )
    }

    if (payment.length == 0){
      return(
        <div className="justify-center">
          No payment historys found.
        </div>
      )
    }
    return (
    <div className="p-10 ">
        {payment.map((paymentRecord) => (
          <PaymentHistoryCard
            key={paymentRecord.paymentId}
            items={paymentRecord.items}
            status={paymentRecord.paymentStatus}
            totalPrice={paymentRecord.totalPrice}
          />
        ))}
    </div>
  );
}
export default PaymentHistory