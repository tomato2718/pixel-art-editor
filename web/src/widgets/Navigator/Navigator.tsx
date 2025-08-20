import { type Theme } from "@/features/Theme";
import { EclipseToggle } from "@/shared/EclipseSwitcher";

export function Navigator({
  theme,
  switchTheme,
}: {
  theme: Theme;
  switchTheme: () => void;
}) {
  return (
    <div className="flex items-center h-24 px-4 bg-grayscale-2 border-b border-grayscale-6">
      <span className="text-2xl select-none cursor-default">Editor</span>
      <div className="flex ms-auto">
        <EclipseToggle
          themeState={{
            isDarkMode: theme === "dark",
            switchTheme: switchTheme,
          }}
          size={16}
        />
      </div>
    </div>
  );
}
