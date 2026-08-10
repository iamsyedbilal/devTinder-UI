function ProfilePreview({ formData }) {
  const skills = formData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div>
      {/* Preview heading */}
      <div className="mb-3">
        <h2 className="font-semibold">Profile Preview</h2>

        <p className="text-xs text-base-content/50">
          This is how your profile will look
        </p>
      </div>

      {/* Tinder card */}
      <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-2xl">
        {/* Image */}
        <figure className="relative h-107.5 overflow-hidden">
          <img
            src={formData.profileImage || "https://i.pravatar.cc/600?img=12"}
            alt={`${formData.firstName || "User"} profile`}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://i.pravatar.cc/600?img=12";
            }}
          />

          {/* Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

          {/* User information */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <h3 className="text-3xl font-bold">
              {formData.firstName || "Your Name"} {formData.lastName}
            </h3>

            <p className="mt-1 text-sm opacity-90">
              {formData.age || "Age"}
              {formData.gender && ` • ${formData.gender}`}
            </p>
          </div>
        </figure>

        {/* Content */}
        <div className="card-body gap-4 p-5">
          {/* About */}
          <div>
            <p className="text-sm leading-relaxed text-base-content/70">
              {formData.about ||
                "Tell people something interesting about yourself."}
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="badge badge-outline border-fuchsia-500/40 text-fuchsia-500"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-base-content/40">
                Your skills will appear here
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePreview;
