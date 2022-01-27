import React, { useState } from "react";
import Cookie from "js-cookie";

const ThemeContext = React.createContext([{}, () => {}]);

const ThemeProvider = ({ children }) => {
  const darkModeCookie = Cookie.get("darkMode");
  const parsedCookie = darkModeCookie
    ? JSON.parse(darkModeCookie).darkMode
    : null;
  const [darkMode, setDarkMode] = useState(parsedCookie || false);

  const toggleDarkMode = () => {
    Cookie.set("darkMode", JSON.stringify({ darkMode: !darkMode }));
    setDarkMode(!darkMode);
  };

  const colors = !darkMode
    ? {
        headerBackground: "#FFF",
        sideBarBackground: "#FCFBF9",
        contentBackground: "#DEDEDE",
        headingColor: "black",
        basicFontColor: "black",
        linkFontColor: "#575654",
        linkHoverColor: "#5c81ff",
        borderColor: "#3679ed",
        iconColor: "black",
        iconHoverColor: "#7D7D7D",
        button: "#5c81ff",
        buttonHover: "#0f46ff",
        shadowColor: "#919191",
        scrollbar: "#5668ff",
        headerColor: "#ffce1c",
        headerShadowColor: "#a9a9a9",
      }
    : {
        headerBackground: "#242424",
        sideBarBackground: "#363636",
        contentBackground: "#474747",
        headingColor: "white",
        basicFontColor: "white",
        linkFontColor: "white",
        linkHoverColor: "#ffd02f",
        borderColor: "#b2b2b2",
        iconColor: "white",
        iconHoverColor: "#c9c9c9",
        button: "#9654ff",
        buttonHover: "#6100cc",
        shadowColor: "#363636",
        scrollbar: "#ffb62f",
        headerColor: "#5d0099",
        headerShadowColor: "#8b8b8b",
      };

  const breakpoints = [475, 720];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, colors, mq }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
