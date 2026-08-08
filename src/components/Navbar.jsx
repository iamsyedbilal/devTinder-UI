function Navbar() {
  return (
    <div className="navbar sticky top-0 z-50 border-b border-base-300/50 bg-base-100/80 px-4 shadow-sm backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* Left - Logo */}
        <div className="navbar-start">
          <a
            href="/"
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 text-lg font-black text-white shadow-lg shadow-fuchsia-500/20">
              D
            </div>

            <span className="hidden bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-500 bg-clip-text text-xl font-extrabold text-transparent sm:block">
              Dev Tinder
            </span>
          </a>
        </div>

        {/* Right */}
        <div className="navbar-end gap-1">
          {/* Home */}
          <a
            href="/"
            className="btn btn-ghost btn-sm hidden rounded-xl font-medium sm:flex"
          >
            Home
          </a>

          {/* Explore */}
          <a
            href="/explore"
            className="btn btn-ghost btn-sm hidden rounded-xl font-medium lg:flex"
          >
            Explore
          </a>

          {/* Profile */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ml-1"
            >
              <div className="w-9 rounded-full ring-2 ring-fuchsia-500/30 ring-offset-2 ring-offset-base-100">
                <img src="https://i.pravatar.cc/100?img=12" alt="Profile" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-1 mt-3 w-56 rounded-2xl border border-base-300/50 bg-base-100/95 p-2 shadow-2xl backdrop-blur-xl"
            >
              <li className="mb-1">
                <a className="rounded-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/10">
                    👤
                  </span>
                  Profile
                </a>
              </li>

              <li>
                <a className="rounded-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200">
                    ⚙️
                  </span>
                  Settings
                </a>
              </li>

              <div className="my-1 h-px bg-base-300/70" />

              <li>
                <a className="rounded-xl text-error hover:bg-error/10">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-error/10">
                    ↪
                  </span>
                  Logout
                </a>
              </li>
            </ul>
          </div>

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
                <a className="rounded-xl">Home</a>
              </li>
              <li>
                <a className="rounded-xl">Explore</a>
              </li>
              <li>
                <a className="rounded-xl">Create Post</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
