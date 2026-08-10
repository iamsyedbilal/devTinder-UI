import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router";
import { getUserProfile } from "./api/authApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setLoading } from "./features/auth/authSlice.js";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        dispatch(setLoading(false));
        return;
      }

      try {
        const response = await getUserProfile();
        dispatch(addUser(response.data.user));
      } catch (error) {
        if (error.response?.status === 401) {
          dispatch(setLoading(false));
          navigate("/login");
          return;
        }

        dispatch(setLoading(false));

        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch user profile",
        );
      }
    };

    fetchUser();
  }, [user, dispatch, navigate]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
