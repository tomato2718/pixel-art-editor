import { useReducer } from "react";

import { type Theme } from "./types";

export function useTheme(): { theme: Theme; switchTheme: () => void } {
  const [theme, switchTheme] = useReducer<Theme, []>((prev) => {
    switch (prev) {
      case "dark":
        return "light";
      case "light":
        return "dark";
    }
  }, "dark");

  return {
    theme,
    switchTheme,
  };
}
