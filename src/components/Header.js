/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { SidebarContext } from "../context/SidebarProvider";
import { UserContext } from "../context/UserProvider";
import LoginModal from "./LoginModal";
import UserDropdown from "./UserDropdown";

export default function Header(props) {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const { activeTab } = props;
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    document
      .getElementById(activeTab)
      .setAttribute(
        "style",
        `border-bottom: 2px solid ${colors.linkFontColor}`
      );
  });

  const breakpoints = [425, 570]
  const mq = breakpoints.map(
    bp=> `@media (max-width: ${bp}px)`
  )

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
    ${mq[1]} {
      flex-direction: column;
      gap: 0;
      justify-content: center;
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
    ${mq[0]} {
      flex-wrap: wrap;
      justify-content: center;
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

  const toggleLoginModal = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  }

  return (
    <>
      <header css={header}>
        <div css={headerContent}>
          <div css={leftHeader}>
            <ExpandCircleDownIcon css={expandSidebar} onClick={toggleSidebar} />
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
            {(currentUser) ? 
              <UserDropdown currentUser={currentUser}/> : 
              <button onClick={toggleLoginModal} css={button}>Log In</button>
            }
          </div>
        </div>
      </header>
      {(showLogin) ? <LoginModal toggleModal={setShowLogin}/> : null}
    </>
  );
}
