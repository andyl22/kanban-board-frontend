import React, { useState } from "react";

const ThemeContext = React.createContext([{}, () => {}]);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("Dark");

  const toggleTheme = () => {
    setTheme(theme === "Light" ? "Dark" : "Light");
  };

  const colors =
    theme === "Light"
      ? {
          headerBackground: "#FFF",
          sideBarBackground: "#FCFBF9",
          contentBackground: "#DEDEDE",
          headingColor: "black",
          basicFontColor: "black",
          linkFontColor: "#737373",
          linkHoverColor: "#414141",
          borderColor: "#3679ed",
          iconColor: "black",
          iconHoverColor: "#7D7D7D"
        }
      : {
          headerBackground: "#242424",
          sideBarBackground: "#363636",
          contentBackground: "#474747",
          headingColor: "white",
          basicFontColor: "white",
          linkFontColor: "white",
          linkHoverColor: "#B2B2B2",
          borderColor: "#ffa746",
          iconColor: "white",
          iconHoverColor: "#A3A3A3"
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
