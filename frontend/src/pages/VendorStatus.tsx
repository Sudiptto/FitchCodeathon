import React, { useState } from 'react';
import NavBar from "../components/NavBar";

interface Order {
  number: number;
  amount: number;
  time: string;
  platesUsed?: number;
  knivesUsed?: number;
  forksUsed?: number;
  spoonsUsed?: number;
}

interface OrderItemProps extends Order {
  onOpenPopup: (order: Order) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ number, amount, time, onOpenPopup, ...rest }) => (
  <div 
    className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 mb-3 cursor-pointer hover:bg-gray-50"
    onClick={() => onOpenPopup({ number, amount, time, ...rest })}
  >
    <div>
      <h3 className="text-lg font-semibold">Order {number}</h3>
      <p className="text-gray-500">${amount.toFixed(2)}</p>
    </div>
    <p className="text-xl font-bold">{time}</p>
  </div>
);

const OrderPopup: React.FC<{ order: Order | null; onClose: () => void }> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-100 p-6 rounded-lg max-w-sm w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Order {order.number}</h2>
        <div className="space-y-2 mb-6">
          <p><span className="font-semibold">Takeout Time:</span> {order.time}</p>
          <p><span className="font-semibold">Plates Used:</span> {order.platesUsed || 'N/A'}</p>
          <p><span className="font-semibold">Knives used:</span> {order.knivesUsed || 'N/A'}</p>
          <p><span className="font-semibold">Forks Used:</span> {order.forksUsed || 'N/A'}</p>
          <p><span className="font-semibold">Spoons Used:</span> {order.spoonsUsed || 'N/A'}</p>
        </div>
        <div className="flex justify-end">
          <button 
            className="bg-green-400 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-green-500 transition-colors"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const VendorStatus: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    { number: 130, amount: 18.00, time: '12:29PM', platesUsed: 5, knivesUsed: 2, forksUsed: 2, spoonsUsed: 2 },
    { number: 129, amount: 14.00, time: '12:28PM', platesUsed: 3, knivesUsed: 1, forksUsed: 1, spoonsUsed: 1 },
    { number: 128, amount: 22.00, time: '12:27PM', platesUsed: 4, knivesUsed: 2, forksUsed: 2, spoonsUsed: 0 },
    { number: 127, amount: 28.00, time: '12:27PM', platesUsed: 6, knivesUsed: 3, forksUsed: 3, spoonsUsed: 3 },
    { number: 126, amount: 44.00, time: '12:26PM', platesUsed: 8, knivesUsed: 4, forksUsed: 4, spoonsUsed: 4 },
    { number: 125, amount: 22.00, time: '12:26PM', platesUsed: 4, knivesUsed: 2, forksUsed: 2, spoonsUsed: 2 },
    { number: 124, amount: 12.00, time: '12:25PM', platesUsed: 2, knivesUsed: 1, forksUsed: 1, spoonsUsed: 1 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow p-4">
        <div className="flex justify-center items-center w-full mb-6">
          <img src="/Ecocycle.png" alt="Ecocycle Logo" className="w-48" />
        </div>
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem 
              key={order.number} 
              {...order} 
              onOpenPopup={setSelectedOrder}
            />
          ))}
        </div>
      </div>
      {selectedOrder && <OrderPopup order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
      <NavBar />
    </div>
  );
};

export default VendorStatus;