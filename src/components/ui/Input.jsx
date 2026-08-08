function Input({
  placeholder = "What's on your mind?",
  className = "",
  ...props
}) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        className={`
          input input-lg w-full rounded-2xl
          border border-base-300/60
          bg-base-200/60
          px-5
          text-base-content
          backdrop-blur-xl
          outline-none
          transition-all duration-300
          placeholder:text-base-content/40
          hover:border-base-300
          focus:border-fuchsia-500/60
          focus:bg-base-200/80
          focus:ring-4
          focus:ring-fuchsia-500/10
          ${className}
        `}
        {...props}
      />
    </div>
  );
}

export default Input;
