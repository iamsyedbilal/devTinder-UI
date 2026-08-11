import { useState } from "react";
import { Button, Input } from "./ui";
import { updatePassword } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function SettingComponent() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    setErrors({});
    setLoading(true);

    try {
      const response = await updatePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(
        response?.data?.message || "Password updated successfully!",
      );

      navigate("/");
      // Clear fields after successful update
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const responseErrors = error?.response?.data?.errors;

      if (responseErrors) {
        setErrors(responseErrors);
      } else {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to update password",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-base-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-base-300/50 bg-base-100/80 p-6 shadow-2xl shadow-fuchsia-500/5 backdrop-blur-xl sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 text-2xl text-white shadow-lg shadow-fuchsia-500/20">
              🔒
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight">Security</h1>

            <p className="mt-2 text-sm text-base-content/50">
              Update your account password
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handlePasswordUpdate}>
            {/* Current Password */}
            <div>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Current password"
                  autoComplete="current-password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={loading}
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 transition hover:text-base-content"
                >
                  {showCurrentPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {errors.currentPassword && (
                <p className="mt-1 text-sm text-error">
                  {errors.currentPassword}
                </p>
              )}

              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 transition hover:text-base-content"
                >
                  {showNewPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {errors.newPassword && (
                <p className="mt-1 text-sm text-error">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 transition hover:text-base-content"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password hint */}
            <div className="rounded-xl bg-base-200/50 p-3 text-sm text-base-content/60">
              Password must be at least 6 characters and contain at least one
              letter and one number.
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" loading={loading}>
              Update password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingComponent;
