import { type ThemeState } from "./types";

export function EclipseToggle({
  themeState,
  size,
}: {
  themeState: ThemeState;
  size: number;
}) {
  const padding = 2;
  const border = 1;
  const iconRadius = size - padding - border;
  return (
    <button
      className="rounded-full overflow-hidden bg-grayscale-3 border-grayscale-6 hover:border-grayscale-7 cursor-pointer"
      style={{
        height: `${size * 2}px`,
        width: `${size * 4}px`,
        borderWidth: `${border}px`,
      }}
      onClick={themeState.switchTheme}
    >
      <div
        className="rounded-full transition-transform duration-500 ease-in-out bg-grayscale-10"
        style={{
          height: `${iconRadius * 2}px`,
          width: `${iconRadius * 2}px`,
          transform: themeState.isDarkMode
            ? `translate(${padding}px, 0px)`
            : `translate(${size * 2 + padding}px, 0px)`,
        }}
      >
        <div
          className="rounded-full transition-transform duration-500 ease-in-out bg-grayscale-3"
          style={{
            height: `${size * 2}px`,
            width: `${size * 2}px`,
            transform: themeState.isDarkMode
              ? `translate(${iconRadius * 0.6}px, -${iconRadius * 0.5 + padding + border}px)`
              : `translate(${iconRadius * 2.4}px, -${iconRadius * 2}px)`,
          }}
        />
      </div>
    </button>
  );
}
