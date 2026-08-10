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
    // We'll call the backend logout API here later.
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
          <span className="hidden bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-500 bg-clip-text text-xl font-extrabold text-transparent sm:block">
            Dev Tinder
          </span>
        </Link>
      </div>

      {/* Right */}
      <div className="navbar-end gap-1">
        {/* Home */}
        <Link
          to="/"
          className="btn btn-ghost btn-sm hidden rounded-xl font-medium sm:flex"
        >
          Home
        </Link>

        {/* Don't show auth buttons while checking authentication */}
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

        {/* Profile */}
        {!loading && user && (
          <div className="dropdown dropdown-end">
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

        {/* Mobile menu */}
        <div className="dropdown dropdown-end sm:hidden">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
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
            className="menu dropdown-content z-1 mt-3 w-52 rounded-2xl border border-base-300/50 bg-base-100 p-2 shadow-2xl"
          >
            <li>
              <Link to="/" className="rounded-xl">
                Home
              </Link>
            </li>

            <li>
              <Link to="/explore" className="rounded-xl">
                Explore
              </Link>
            </li>

            <li>
              <Link to="/create-post" className="rounded-xl">
                Create Post
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
