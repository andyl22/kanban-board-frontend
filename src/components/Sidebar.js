/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { SidebarContext } from "../context/SidebarProvider";

export default function Sidebar() {
  const { colors } = useContext(ThemeContext);
  const { showSidebar } = useContext(SidebarContext);

  const rolloutX = keyframes`
    0% {
      opacity: 0;
      transform: translateX(-255px);
      transform-origin: left;
    }
    100% {
      transform: translateX(0px);
    }
  `;

  const textoutX = keyframes`
  0% {opacity: 0;
    transform: translateX(-25px);
 }
 100% {
    opacity: 100;
    transform: translateX(0);
 }
  `;
  const rolloutY = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
    transform-origin: left;
  }
  100% {
    transform: translateY(0px);
  }
`;

  const textoutY = keyframes`
0% {
  opacity: 0;
  transform: translateY(25px);
}
100% {
  opacity: 100;
  transform: translateY(0);
}
`;

  const sidebar = css`
    flex: 0;
    display: flex;
    padding: 1em;
    flex-direction: column;
    align-items: center;
    min-width: 250px;
    background: ${colors.sideBarBackground};
    box-shadow: 0px 5px 5px gray;
    z-index: 1;
    @media (min-width: 410px) {
      animation: ${rolloutX} 0.5s ease-in;
      h1 {
        animation: ${textoutX} 0.5s ease-in;
      }
      button {
        animation: ${textoutX} 0.5s ease-in;
      }
    }
    @media (max-width: 410px) {
      position: absolute;
      height: 100%;
      width: 100%;
      animation: ${rolloutY} 0.2s;
      h1 {
        animation: ${textoutY} 0.2s ease-in;
      }
      button {
        animation: ${textoutY} 0.2s ease-in;
      }
    }
  `;

  if (showSidebar) {
    return (
      <section css={sidebar}>
        <h1>Sidebar</h1>
        <button>Close</button>
      </section>
    );
  }

  return null;
}
