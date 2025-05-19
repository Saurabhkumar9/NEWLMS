import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'react-feather';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <XCircle size={64} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-6">Your payment was not completed. Please try again.</p>
        <div className="mt-6 flex justify-center gap-4">
          
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
