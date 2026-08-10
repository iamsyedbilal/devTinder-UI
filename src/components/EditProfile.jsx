import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileForm from "./ProfileForm";
import ProfilePreview from "./ProfilePreview";

const buildInitialFormData = (user) => ({
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  age: user?.age || "",
  gender: user?.gender || "",
  about: user?.about || "",
  skills: user?.skills?.join(", ") || "",
  profileImage: user?.profileImage || "",
});

function EditProfile() {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState(() => buildInitialFormData(user));

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-fuchsia-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <div className="alert alert-error max-w-md shadow-lg">
          <span>Unable to load your profile. Please login again.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Edit Profile
          </h1>

          <p className="mt-2 text-base-content/60">
            Update your profile and show people what you're building.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <ProfileForm
            formData={formData}
            setFormData={setFormData}
            user={user}
          />

          {/* LIVE Preview */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <ProfilePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
