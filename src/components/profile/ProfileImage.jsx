import { Input } from "../ui";

function ProfileImage({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        Profile Image URL
      </label>

      <Input
        type="url"
        name="profileImage"
        value={
          value ||
          "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
        }
        onChange={onChange}
        placeholder="https://example.com/profile.jpg"
      />

      <p className="mt-2 text-xs text-base-content/50">
        Use a publicly accessible image URL.
      </p>
    </div>
  );
}

export default ProfileImage;
