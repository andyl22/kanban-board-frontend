/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { SidebarContext } from "../context/SidebarProvider";

export default function Header(props) {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const { activeTab } = props;

  useEffect(() => {
    document
      .getElementById(activeTab)
      .setAttribute(
        "style",
        `border-bottom: 2px solid ${colors.linkFontColor}`
      );
  });

  const header = css`
    border-bottom: 2px solid #f2f2f2;
    background: ${colors.headerBackground};
  `;

  const headerContent = css`
    display: flex;
    justify-content: space-between;
    gap: 2em;
    align-items: center;
    h1 {
      color: ${colors.headingColor};
    }
  `;

  const expandSidebar = css`
    color: ${colors.iconColor};
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
      transition: 0.1s ease-in;
      color: ${colors.iconHoverColor};
    }
  `;

  const leftHeader = css`
    display: flex;
    gap: 1em;
    padding: 0.8em 1em;
  `;

  const rightHeader = css`
    display: flex;
    text-align: center;
    align-items: center;
    gap: 2em;
    font-weight: 600;
    font-size: 0.8em;
    padding: 0.8em 5em;
    a {
      padding: 0 0 0.2em 0;
      color: ${colors.linkFontColor};
      &:hover {
        color: ${colors.linkHoverColor};
      }
    }
  `;

  const button = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #5c81ff;
    color: white;
    padding: 0.4em 1em;
    line-height: 1em;
    border-radius: 0.3em 1em;
    border: none;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      background: #0f46ff;
      transform: scale(1.05);
      transition: 0.1s ease-in;
    }
  `;

  const handleSignIn = () => {
    const data = {
      username: "AndyLau2",
      password: "password12345",
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/auth/login", options)
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <header css={header}>
      <div css={headerContent}>
        <div css={leftHeader}>
          <ExpandCircleDownIcon css={expandSidebar} onClick={toggleSidebar}/>
          <h1>Kanban</h1>
        </div>
        <div css={rightHeader}>
          <Link to="/kanban-board" id="home">
            Kanban Board
          </Link>
          <Link to="/kanban-board/project-list" id="project-list">
            Projects List
          </Link>
          <button onClick={toggleTheme} css={button}>
            {theme} Theme
          </button>
          <button onClick={handleSignIn} css={button}>
            Log In
          </button>
        </div>
      </div>
    </header>
  );
}
