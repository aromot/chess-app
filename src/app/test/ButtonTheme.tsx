import { Button } from "@/components/ui/button";
import { useMyTheme } from "./MyThemeProvider";

const ButtonTheme = () => {
  const theme = useMyTheme();

  if (theme?.name === "light") {
    return (
      <Button onClick={theme.switchToDark}>Light .... passer en dark</Button>
    );
  }

  return (
    <Button onClick={theme?.switchToLight}>Dark .... passer en light</Button>
  );
};

export default ButtonTheme;
