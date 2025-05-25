import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-green-800">
      <CheckCircle size={64} />
      <h1 className="text-3xl font-bold mt-4">Payment Successful!</h1>
      <p className="mt-2 text-center">Thank you for your payment. Your traffic fine has been marked as paid.</p>
    </div>
  );
}
