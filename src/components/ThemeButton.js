/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import ToggleButton from "./ToggleButton";
import { ThemeContext } from "../context/ThemeProvider";
import { useContext } from "react";
import { postHTTP } from "../utilities/fetchAPIs";

export default function ThemeButton() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const buttonState = darkMode;

  const changeTheme = (e) => {
    postHTTP("/users/toggleUserDarkMode", { darkMode: !darkMode }).catch(
      (err) => console.log(err)
    );
    toggleDarkMode();
  };

  return (
    <div>
      <ToggleButton buttonState={buttonState} handleChange={changeTheme} />
    </div>
  );
}
