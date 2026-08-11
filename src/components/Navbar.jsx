import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeUser } from "../features/auth/authSlice";
import { logoutUser } from "../api/authApi";
import toast from "react-hot-toast";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutUser();

    dispatch(removeUser());
    navigate("/login");

    toast.success(response?.data?.message || "User Logout");
  };

  return (
    <div className="navbar">
      {/* Left - Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <span className="bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-500 bg-clip-text text-xl font-extrabold text-transparent">
            Dev Tinder
          </span>
        </Link>
      </div>

      {/* Right */}
      <div className="navbar-end gap-1">
        {/* Desktop Home */}
        <Link
          to="/"
          className="btn btn-ghost btn-sm hidden rounded-xl font-medium sm:flex"
        >
          Home
        </Link>

        {/* Desktop Guest Links */}
        {!loading && !user && (
          <>
            <Link
              to="/login"
              className="btn btn-ghost btn-sm hidden rounded-xl font-medium lg:flex"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="btn btn-ghost btn-sm hidden rounded-xl font-medium lg:flex"
            >
              Signup
            </Link>
          </>
        )}

        {/* Desktop Authenticated Links */}
        {!loading && user && (
          <div className="hidden lg:flex">
            <Link
              to="/connections"
              className="btn btn-ghost btn-sm rounded-xl font-medium"
            >
              Connections
            </Link>

            <Link
              to="/requests"
              className="btn btn-ghost btn-sm rounded-xl font-medium"
            >
              Requests
            </Link>
          </div>
        )}

        {/* Desktop Profile */}
        {!loading && user && (
          <div className="dropdown dropdown-end z-50 hidden sm:block">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ml-1"
            >
              <div className="w-9 rounded-full ring-2 ring-fuchsia-500/30 ring-offset-2 ring-offset-base-100">
                <img
                  src={user.profileImage || "https://i.pravatar.cc/100?img=12"}
                  alt={`${user.firstName || "User"} profile picture`}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-1 mt-3 w-56 rounded-2xl border border-base-300/50 bg-base-100/95 p-2 shadow-2xl backdrop-blur-xl"
            >
              <li className="mb-1">
                <Link to="/profile" className="rounded-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/10">
                    👤
                  </span>
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/settings" className="rounded-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200">
                    ⚙️
                  </span>
                  Settings
                </Link>
              </li>

              <div className="my-1 h-px bg-base-300/70" />

              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-xl text-error hover:bg-error/10"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-error/10">
                    ↪
                  </span>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end z-50 sm:hidden">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-1 mt-3 w-60 rounded-2xl border border-base-300/50 bg-base-100/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            {/* Common */}
            <li>
              <Link to="/" className="rounded-xl">
                🏠
                <span>Home</span>
              </Link>
            </li>

            {/* Guest */}
            {!loading && !user && (
              <>
                <li>
                  <Link to="/login" className="rounded-xl">
                    🔐
                    <span>Login</span>
                  </Link>
                </li>

                <li>
                  <Link to="/signup" className="rounded-xl">
                    ✨<span>Signup</span>
                  </Link>
                </li>
              </>
            )}

            {/* Authenticated */}
            {!loading && user && (
              <>
                <li>
                  <Link to="/connections" className="rounded-xl">
                    👥
                    <span>Connections</span>
                  </Link>
                </li>

                <li>
                  <Link to="/requests" className="rounded-xl">
                    📩
                    <span>Requests</span>
                  </Link>
                </li>

                <li>
                  <Link to="/profile" className="rounded-xl">
                    👤
                    <span>Profile</span>
                  </Link>
                </li>

                <li>
                  <Link to="/settings" className="rounded-xl">
                    ⚙️
                    <span>Settings</span>
                  </Link>
                </li>

                <div className="my-1 h-px bg-base-300/70" />

                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl text-error hover:bg-error/10"
                  >
                    ↪<span>Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
