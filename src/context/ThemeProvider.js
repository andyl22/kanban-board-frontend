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
          headerFontColor: "black",
          headingOneColor: "black",
          headingTwoColor: "black",
          basicFontColor: "black",
          linkFontColor: "#737373",
          linkHoverColor: "#999",
        }
      : {
          headerBackground: "#242424",
          sideBarBackground: "#363636",
          contentBackground: "#474747",
          headingColor: "white",
          basicFontColor: "white",
          linkFontColor: "white",
          linkHoverColor: "white",
          iconColor: "white",
          iconHoverColor: "#E3E3E3",
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
