import { useEffect, useState } from "react";
import { getRequests } from "../api/feedApi";
import { Loading } from "../components/ui";
import { toast } from "react-hot-toast";

function Requests() {
  const [requestsList, setRequestsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function requests() {
      try {
        setLoading(true);
        const response = await getRequests();
        setRequestsList(
          Array.isArray(response?.data?.data) ? response.data.data : [],
        );
      } catch (error) {
        toast.error(error.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    }

    requests();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!requestsList || requestsList.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No connection requests yet
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Connection Requests</h1>
      <div className="space-y-4">
        {requestsList.map((request) => (
          <div
            key={request._id}
            className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {request.fromUserId?.profileImage && (
                <img
                  src={request.fromUserId.profileImage}
                  alt={request.fromUserId.firstName}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">
                  {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                </h2>
                <p className="text-gray-600">{request.fromUserId?.about}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
                Reject
              </button>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Requests;
