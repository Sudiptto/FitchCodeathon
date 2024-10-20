import React from 'react';
import NavBar from "../components/NavBar";

interface Order {
  number: number;
  amount: number;
  time: string;
}

interface OrderItemProps extends Order {}

const OrderItem: React.FC<OrderItemProps> = ({ number, amount, time }) => (
  <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 mb-3">
    <div>
      <h3 className="text-lg font-semibold">Order {number}</h3>
      <p className="text-gray-500">${amount.toFixed(2)}</p>
    </div>
    <p className="text-xl font-bold">{time}</p>
  </div>
);

const VendorStatus: React.FC = () => {
  const orders: Order[] = [
    { number: 130, amount: 18.00, time: '12:29PM' },
    { number: 129, amount: 14.00, time: '12:28PM' },
    { number: 128, amount: 22.00, time: '12:27PM' },
    { number: 127, amount: 28.00, time: '12:27PM' },
    { number: 126, amount: 44.00, time: '12:26PM' },
    { number: 125, amount: 22.00, time: '12:26PM' },
    { number: 124, amount: 12.00, time: '12:25PM' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow p-4">
        <div className="flex justify-center items-center w-full mb-6">
          <img src="/Ecocycle.png" alt="Ecocycle Logo" className="w-48" />
        </div>
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem key={order.number} {...order} />
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default VendorStatus;