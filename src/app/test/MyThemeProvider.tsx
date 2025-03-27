import { createContext, useContext, useState } from "react";

type ThemeType = {
  name: "dark" | "light";
  switchToLight: () => void;
  switchToDark: () => void;
};

const ThemeContext = createContext<ThemeType | null>(null);

const MyThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<ThemeType["name"]>("light");
  const switchToLight = () => setName("light");
  const switchToDark = () => setName("dark");

  const defaultValues = { name, switchToLight, switchToDark };

  return <ThemeContext value={defaultValues}>{children}</ThemeContext>;
};

export function useMyTheme() {
  return useContext(ThemeContext);
}

export default MyThemeProvider;
