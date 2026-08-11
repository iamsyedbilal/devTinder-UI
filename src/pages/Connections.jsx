import { useEffect, useState } from "react";
import { getConnections } from "../api/feedApi";
import { Loading } from "../components/ui";
import { toast } from "react-hot-toast";

export default function Connections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchConnections() {
      try {
        setLoading(true);
        const response = await getConnections();
        if (!mounted) return;
        // response payload is expected at response.data.data
        setConnections(
          Array.isArray(response?.data?.data) ? response.data.data : [],
        );
      } catch (err) {
        if (!mounted) return;
        toast.error(err?.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchConnections();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Loading />;

  if (connections.length === 0)
    return <div className="text-center p-6">No connections found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Connections ({connections.length})
      </h2>
      <ul className="divide-y divide-base-200">
        {connections.map((user) => (
          <li
            key={user.id || user._id || user.emailId}
            className="flex gap-3 items-center py-3"
          >
            <img
              src={user.profileImage || "/placeholder-avatar.png"}
              alt={user.firstName || "User avatar"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {user.firstName || "Unnamed"} {user.lastName || "Unnamed"}
              </div>
              {user.about && (
                <div className="text-sm text-muted mt-1">{user.about}</div>
              )}
              {Array.isArray(user.skills) && user.skills.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {user.skills.map((skill, i) => (
                    <span key={i} className="badge badge-outline badge-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
