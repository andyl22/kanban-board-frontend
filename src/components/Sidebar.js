/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export default function Sidebar() {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const sidebar = css`
    flex: 0;
    display: flex;
    flex-direction: column;
    padding: 1em 5em;
    background: ${colors.sideBarBackground};
    box-shadow: 0px 5px 5px gray;
    z-index: 1;
  `;

  return (
    <section css={sidebar}>
      <h1>Sidebar</h1>
    </section>
  );
}
