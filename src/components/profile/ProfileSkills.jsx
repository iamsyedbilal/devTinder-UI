import { Input } from "../ui";

function ProfileSkills({ value, onChange }) {
  const skills = value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium">Skills</label>

        <span className="text-xs text-base-content/50">{skills.length}/10</span>
      </div>

      <Input
        name="skills"
        value={value}
        onChange={onChange}
        placeholder="React, JavaScript, CSS"
      />

      {skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="
                badge
                border-fuchsia-500/30
                bg-fuchsia-500/10
                px-3 py-3
                text-fuchsia-500
              "
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileSkills;
