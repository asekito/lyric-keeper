import { useState } from "react";

interface ReturnShape {
  darkModeIsEnabled: boolean;
  setDarkMode(value: boolean): void;
}

export const UseDarkMode = () => {
  const [darkModeIsEnabled, setDarkModeIsEnabled] = useState<boolean>(
    window.localStorage.getItem("darkMode") === "true"
  );

  const setDarkMode = (value: boolean) => {
    window.localStorage.setItem("darkMode", `${value}`);
    setDarkModeIsEnabled(value);
  };

  const returnValues: ReturnShape = { darkModeIsEnabled, setDarkMode };

  return returnValues;
};
