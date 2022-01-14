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

  const sidebar = css`
    flex: 0;
    display: flex;
    padding: 1em;
    flex-direction: column;
    align-items: flex-start;
    min-width: fit-content;
    background: ${colors.sideBarBackground};
    box-shadow: 0px 5px 5px gray;
    overflow: auto;
    animation: ${rolloutX} 0.1s ease-in;
    h1,
    a,
    button {
      animation: ${textoutX} 0.1s ease-in;
    }
    h1 {
      padding: 0 0 1em 0;
    }
    a {
      font-size: 0.8em;
    }
    &::-webkit-scrollbar {
      border-bottom-right-radius: 2em;
    }
    &::-webkit-scrollbar-thumb {
      background: #ffb62f;
      border: 4px solid ${colors.sideBarBackground};
      border-radius: 2em;
    }
    @media (max-width: 720px) {
      min-width: 160px;
      word-break: break-word;
    }
  `;

  const sidebarHeader = css`
    display: flex;
    justify-content: space-between;
    gap: .8em;
  `

  if (showSidebar) {
    return (
      <section css={sidebar}>
        <div css={sidebarHeader} >
          <h1>{title}</h1>
          <ArrowBackIcon onClick={toggleSidebar} />
        </div>
        {children}
      </section>
    );
  }

  return null;
}
