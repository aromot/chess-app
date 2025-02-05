import React from "react";
import ButtonTheme from "./ButtonTheme";
import { useMyTheme } from "./MyThemeProvider";

const AppHeader = () => {
  const theme = useMyTheme();

  const classes =
    theme?.name === "light"
      ? "p-3 bg-white text-slate-900"
      : "p-3 bg-black text-white";

  return (
    <header className={classes} style={{ border: "1px dashed blue" }}>
      <div>Ici un titre</div>
      <ButtonTheme />
    </header>
  );
};

export default AppHeader;
