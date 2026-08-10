function ProfileAbout({ value, onChange }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium">About you</label>

        <span className="text-xs text-base-content/50">{value.length}/500</span>
      </div>

      <textarea
        name="about"
        value={value}
        onChange={onChange}
        placeholder="Tell people a little about yourself..."
        maxLength={500}
        rows={5}
        className="
          textarea textarea-lg
          w-full resize-none rounded-2xl
          border border-base-300/60
          bg-base-200/60
          backdrop-blur-xl
          outline-none
          transition-all duration-300
          placeholder:text-base-content/40
          focus:border-fuchsia-500/60
          focus:bg-base-200/80
          focus:ring-4
          focus:ring-fuchsia-500/10
        "
      />
    </div>
  );
}

export default ProfileAbout;
