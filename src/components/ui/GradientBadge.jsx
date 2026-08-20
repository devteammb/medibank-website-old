export default function GradientBadge({
  children,
  className = "",
  innerClassName = "",
  as: Component = "span",
}) {
  return (
    <Component
      className={`inline-flex rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 p-[2px] ${className}`.trim()}
    >
      <span
        className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-[12px] font-semibold tracking-wide ${innerClassName}`.trim()}
      >
        {children}
      </span>
    </Component>
  );
}
