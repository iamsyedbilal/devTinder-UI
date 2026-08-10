import { Input } from "../ui";

function ProfileBasicInfo({ formData, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">First Name</label>

          <Input
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="Emma"
            minLength={3}
            maxLength={30}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Last Name</label>

          <Input
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder="Johnson"
            minLength={3}
            maxLength={30}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Age</label>

          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={onChange}
            placeholder="24"
            min={18}
            max={100}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            className="select select-lg w-full rounded-2xl border border-base-300/60 bg-base-200/60"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProfileBasicInfo;
