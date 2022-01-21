/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import React, { useContext, useEffect } from "react";
import { SidebarContext } from "../context/SidebarProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { UserContext } from "../context/UserProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
export default function LeftHeader(props) {
  const { showSidebar, toggleSidebar } = useContext(SidebarContext);
  const { currentUser } = useContext(UserContext);
  const { colors, mq } = useContext(ThemeContext);
  const { activeTab, title } = props;
  const { id } = useParams();

  const highlightAnimation = keyframes`
    0% {
      transform: scale(300%);
      background: #ffb03b;
    }
    80% {
      transform: scale(70%);
      background: none;
    }
    100% {
      transform: scale(50%);
      background: none;
    }
  `;

  const highlight = css`
    position: absolute;
    top: 0.2em;
    left: 0.7em;
    height: 30px;
    width: 30px;
    border-radius: 1em;
    animation: ${highlightAnimation} 4s infinite ease-out;
    pointer-events: none;
    ${mq[1]} {
      top: 0.2em;
      left: 0.2em;
    }
  `;

  const expandButton = css`
    border: none;
    background: none;
    color: ${colors.iconColor};
    border-radius: 1em;
    &:hover {
      cursor: pointer;
    }
    ${mq[1]} {
      position: absolute;
      top: 0.5em;
      left: 0.5em;
    }
  `;

  const leftHeader = css`
    display: flex;
    gap: 1em;
    padding: 0em 1em;
  `;

  return (
    <div css={leftHeader}>
      {activeTab === "home" && currentUser ? (
        showSidebar ? null : (
          <>
            {id === undefined ? <span css={highlight}></span> : null}
            <button css={expandButton} onClick={toggleSidebar}>
              <ExpandMoreIcon fontSize="small" />
            </button>
          </>
        )
      ) : null}
      <h1>{title}</h1>
    </div>
  );
}
