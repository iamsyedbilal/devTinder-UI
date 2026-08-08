function Button({
  children = "Button",
  variant = "primary",
  className = "",
  loading = false,
  disabled = false,
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white border-0 shadow-lg shadow-fuchsia-500/20 hover:shadow-xl hover:shadow-fuchsia-500/30 hover:brightness-110",
    secondary:
      "bg-base-200/80 text-base-content border border-base-300/60 hover:bg-base-300",
    ghost: "bg-transparent text-base-content hover:bg-base-200/70",
  };
  return (
    <button
      disabled={loading || disabled}
      className={`btn rounded-2xl px-6 font-semibold transition-all duration-300 active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
export default Button;
