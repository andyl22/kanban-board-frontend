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
          shadow: "gray",
        }
      : {
        headerBackground: "#262626",
        sideBarBackground: "#262626",
        contentBackground: "#262626",
        headingColor: "white",
        basicFontColor: "white",
        linkFontColor: "white",
        linkHoverColor: "white",
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
