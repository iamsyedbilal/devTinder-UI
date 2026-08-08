import { useState } from "react";
import { Button, Input } from "./ui";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

function LoginComponent() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await loginUser({
        emailId,
        password,
      });

      toast.success(response?.data?.message || "Welcome back!");
      dispatch(addUser(response.data?.user));
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-base-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl border border-base-300/50 bg-base-100/80 p-6 shadow-2xl shadow-fuchsia-500/5 backdrop-blur-xl sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 text-2xl font-black text-white shadow-lg shadow-fuchsia-500/20">
              D
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-base-content/50">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLoginSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="email"
              required
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              disabled={loading}
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  disabled={loading}
                  className="checkbox checkbox-sm checkbox-secondary"
                />
                <span className="text-base-content/60">Remember me</span>
              </label>

              <a
                href="/forgot-password"
                className="font-medium text-fuchsia-500 transition hover:text-fuchsia-400"
              >
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              Login
            </Button>
          </form>

          {/* Signup */}
          <p className="mt-7 text-center text-sm text-base-content/50">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-fuchsia-500 hover:text-fuchsia-400"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
