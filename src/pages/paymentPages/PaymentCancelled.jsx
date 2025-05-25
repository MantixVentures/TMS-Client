import React from 'react';
import { XCircle } from 'lucide-react';

export default function PaymentCancelled() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-800">
      <XCircle size={64} />
      <h1 className="text-3xl font-bold mt-4">Payment Cancelled</h1>
      <p className="mt-2 text-center">Your payment was not completed. You can try again later.</p>
    </div>
  );
}
