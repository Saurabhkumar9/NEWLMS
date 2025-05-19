import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'react-feather';
import axios from 'axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    console.log(sessionId);

    const verifyPayment = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/v1/api/verify-payment/${sessionId}`);
        console.log(data);
        
        if (data.success) {
          setPaymentDetails(data.payment);
        } else {
          setError(data.message || 'Payment verification failed');
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Verification failed');
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  if (error) {
    return (
      <div className="text-center p-10">
        <h1 className="text-red-600 text-2xl font-bold">Verification Error</h1>
        <p>{error}</p>
        <button onClick={() => navigate('/course-list')} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-10">
      <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p>Thank you! Your payment has been processed.</p>
      {paymentDetails && (
        <div className="mt-4 max-w-md mx-auto bg-gray-50 p-4 rounded-md">
          <p className="mb-2">
            <span className="font-semibold">Amount:</span> ₹{paymentDetails.amount}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Order ID:</span> {paymentDetails.orderId}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Transaction ID:</span> {paymentDetails.transactionId}
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Payment completed on {new Date(paymentDetails.createdAt).toLocaleString()}
          </p>
        </div>
      )}
      <div className="mt-6 flex justify-center gap-4">
        <button 
          onClick={() => navigate('/my-course')} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          View My Courses
        </button>
        <button 
          onClick={() => navigate(-2)} 
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;