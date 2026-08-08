function Input({
  placeholder = "what's on your mind?",
  className = "",
  ...props
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="
          input input-lg w-full rounded-2xl
          bg-base-200/60 backdrop-blur-xl
          border border-base-300/60
          px-5
          text-base-content
          placeholder:text-base-content/40
          outline-none
          transition-all duration-300
          focus:border-fuchsia-500/60
          focus:bg-base-200/80
          focus:ring-4
          focus:ring-fuchsia-500/10
          hover:border-base-300
        "
        {...props}
      />
    </div>
  );
}
export default Input;
