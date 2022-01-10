/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { SidebarContext } from "../context/SidebarProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Sidebar(props) {
  const { title, children } = props;
  const { colors } = useContext(ThemeContext);
  const { showSidebar, toggleSidebar } = useContext(SidebarContext);

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
    position: relative;
    padding: 1em;
    flex-direction: column;
    align-items: flex-start;
    min-width: 200px;
    background: ${colors.sideBarBackground};
    box-shadow: 0px 5px 5px gray;
    z-index: 1;
    h1 {
      padding: 0 0 1em 0;
    }
    animation: ${rolloutX} 0.5s ease-in;
    h1,
    a,
    button {
      animation: ${textoutX} 0.5s ease-in;
    }
    a {
      font-size: 0.8em;
    }
    @media (max-width: 570px) {
      position: absolute;
      height: 100%;
      width: 100%;
      animation: ${rolloutY} 0.5s;
      h1,
      a,
      button {
        animation: ${textoutY} 0.5s ease-in;
      }
    }
  `;

  const arrow = css`
    color: ${colors.iconColor};
    position: absolute;
    right: 0.5em;
    &:hover {
      cursor: pointer;
      color: ${colors.iconHoverColor};
    }
  `;

  if (showSidebar) {
    return (
      <section css={sidebar}>
        <h1>{title}</h1>
        {children}
        <ArrowBackIcon onClick={toggleSidebar} css={arrow} />
      </section>
    );
  }

  return null;
}
