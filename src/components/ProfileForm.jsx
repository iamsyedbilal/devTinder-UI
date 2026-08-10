import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { editProfile } from "../api/userApi";
import { addUser } from "../features/auth/authSlice";

import { Button } from "./ui";

import ProfileBasicInfo from "./profile/ProfileBasicInfo.jsx";
import ProfileAbout from "./profile/ProfileAbout";
import ProfileSkills from "./profile/ProfileSkills";
import ProfileImage from "./profile/ProfileImage";

function ProfileForm({ formData, setFormData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skills = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skills.length > 10) {
      toast.error("You can add maximum 10 skills");
      return;
    }

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      age: formData.age ? Number(formData.age) : "",
      gender: formData.gender,
      about: formData.about.trim(),
      skills,
      profileImage: formData.profileImage.trim(),
    };

    try {
      setSaving(true);

      const response = await editProfile(payload);

      if (response.data.user) {
        dispatch(addUser(response.data.user));
      }

      toast.success(response.data.message || "Profile updated successfully");

      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProfileBasicInfo formData={formData} onChange={handleChange} />

      <ProfileAbout value={formData.about} onChange={handleChange} />

      <ProfileSkills value={formData.skills} onChange={handleChange} />

      <ProfileImage value={formData.profileImage} onChange={handleChange} />

      <div className="divider" />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/profile")}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button type="submit" loading={saving}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
