import { Navigator } from "./widgets/Navigator";
import { useTheme } from "./features/Theme";

export function Layout({ children }: { children: React.ReactElement }) {
  const { theme, switchTheme } = useTheme();
  return (
    <div
      className={`w-screen h-dvh bg-grayscale-1 text-grayscale-11 flex flex-col ${theme}`}
    >
      <div className="w-full">
        <Navigator theme={theme} switchTheme={switchTheme} />
      </div>
      <div className="h-full overflow-y-auto">{children}</div>
    </div>
  );
}
