function Loading({ size = "md", text = "Loading..." }) {
  const sizes = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
    xl: "loading-xl",
  };

  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-4">
      <span
        className={`loading loading-spinner ${sizes[size]} text-fuchsia-500`}
      />

      {text && (
        <p className="text-sm font-medium text-base-content/50">{text}</p>
      )}
    </div>
  );
}

export default Loading;
