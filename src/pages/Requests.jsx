import { useEffect, useState } from "react";
import { getRequests, acceptOrRejectRequest } from "../api/feedApi";
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

  const handleRequest = async (status, requestId) => {
    try {
      const response = await acceptOrRejectRequest(status, requestId);

      toast.success(response?.data?.message || `Connection request ${status}`);

      setRequestsList((prev) =>
        prev.filter((request) => request._id !== requestId),
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update connection request",
      );
    }
  };

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
            className="bg-white rounded-lg shadow p-6 flex items-center gap-6"
          >
            {/* User information */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {request.fromUserId?.profileImage && (
                <img
                  src={request.fromUserId.profileImage}
                  alt={request.fromUserId.firstName}
                  className="w-20 h-20 rounded-full object-cover shrink-0"
                />
              )}

              <div className="min-w-0">
                <h2 className="text-xl font-semibold">
                  {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                </h2>

                {request.fromUserId?.about && (
                  <p className="text-gray-600 mt-1 line-clamp-2">
                    {request.fromUserId.about}
                  </p>
                )}

                {/* Skills */}
                {Array.isArray(request.fromUserId?.skills) &&
                  request.fromUserId.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {request.fromUserId.skills.map((skill, i) => (
                        <span key={i} className="badge badge-outline badge-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => handleRequest("rejected", request._id)}
              >
                Reject
              </button>

              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => handleRequest("accepted", request._id)}
              >
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
