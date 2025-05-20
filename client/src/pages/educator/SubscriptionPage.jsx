import axios from "axios";
import React, { useEffect, useState } from "react";
const URL=  import.meta.env.VITE_BASE_URL;
const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/v1/api/subscribers`
      );

      const subscriptionData =
        response.data?.data?.map((item) => ({
          email: item.email,
          createdAt: new Date(item.createdAt).toLocaleString(),
        })) || [];

      setSubscriptions(subscriptionData);
      setError(null);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      setError(
        error.response?.data?.message || "Failed to fetch subscriptions"
      );
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading subscriptions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Email Subscriptions
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View all user subscriptions with their email and subscription date
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredSubscriptions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchTerm
              ? "No matching subscriptions found"
              : "No subscriptions available"}
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscription Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscriptions.map((subscription, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subscription.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          Total subscriptions: {subscriptions.length}
          {searchTerm &&
            filteredSubscriptions.length !== subscriptions.length && (
              <span> (Filtered: {filteredSubscriptions.length})</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
