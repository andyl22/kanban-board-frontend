/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { SidebarContext } from "../context/SidebarProvider";

export default function Sidebar() {
  const { colors } = useContext(ThemeContext);
  const { showSidebar } = useContext(SidebarContext);

  const rollout = keyframes`
    0% {
      opacity: 0;
      transform: translateX(-255px);
      transform-origin: left;
    }
    100% {
      transform: translateX(0px);
    }
  `;

  const sideout = keyframes`
  0% {
    opacity: 0;
    padding: 0;
    transform: translateX(-25px);
 }
 100% {
    transform: translateX(0);
 }
  `;

  const sidebar = css`
    flex: 0;
    display: flex;
    min-width: 250px;
    flex-direction: column;
    align-items: center;
    padding: 1em .5em;
    background: ${colors.sideBarBackground};
    box-shadow: 0px 5px 5px gray;
    z-index: 1;
    animation: ${rollout} .2s;
    h1 {
      animation: ${sideout} .3s ease-in;
    }
  `;

  if (showSidebar) {
    return (
      <section css={sidebar}>
        <h1>Sidebar</h1>
      </section>
    );
  }

  return null;
}
