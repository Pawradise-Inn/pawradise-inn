import PaymentHistoryCard from "./paymentcomponent"

// Data for the first card (multiple items)
const order1Items = [
  { id: 1, name: 'Grooming Service', pet_name: 'Buddy', price: 45.00 },
  { id: 2, name: 'Premium Pet Food', pet_name: 'Buddy', price: 22.50 },
  { id: 2, name: 'Premium Pet Food', pet_name: 'Buddy', price: 22.50 },
  { id: 2, name: 'Premium Pet Food', pet_name: 'Buddy', price: 22.50 },
  { id: 2, name: 'Premium Pet Food', pet_name: 'Buddy', price: 22.50 },
  { id: 2, name: 'Premium Pet Food', pet_name: 'Buddy', price: 22.50 }
];

// Data for the second card (single item)
const order2Items = [
  { id: 3, name: 'Room 10A (Deluxe)', pet_name: 'Max', price: 120.00}
];
const PaymentHistory = () => {
    return (
    <div className="p-10 ">
      {/* CARD 1: Will be taller (2 items) 
      */}
      <PaymentHistoryCard 
        items={order1Items}
        status="Paid"
        totalPrice={67.50}
      />

      {/* CARD 2: Will be shorter (1 item) 
      */}
      <PaymentHistoryCard 
        items={order2Items}
        status="Failed"
        totalPrice={120.00}
      />
    </div>
  );
}
export default PaymentHistory