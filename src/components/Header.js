/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { SidebarContext } from "../context/SidebarProvider";
import { UserContext } from "../context/UserProvider";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import UserDropdown from "./UserDropdown";
import Cookies from "js-cookie";

export default function Header(props) {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const { title, activeTab } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document
      .getElementById(activeTab)
      .setAttribute(
        "style",
        `border-bottom: 2px solid ${colors.linkFontColor}`
      );
  }, [currentUser, activeTab, colors.linkFontColor]);

  const breakpoints = [475, 720];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const header = css`
    border-bottom: 2px solid #f2f2f2;
    background: ${colors.headerBackground};
    padding: 0.5em 0;
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
      gap: 0.5em;
      justify-content: center;
    }
  `;

  const expandSidebar = css`
    color: ${colors.iconColor};
    transform: scale(0.9);
    &:hover {
      cursor: pointer;
      transition: 0.1s ease-in;
      color: ${colors.iconHoverColor};
    }
    ${mq[1]} {
      position: absolute;
      top: 0.5em;
      left: 0.5em;
      transform: scale(0.85);
    }
  `;

  const leftHeader = css`
    display: flex;
    gap: 1em;
    padding: 0em 1em;
  `;

  const rightHeader = css`
    display: flex;
    text-align: center;
    align-items: center;
    gap: 2em;
    font-weight: 600;
    padding: 0 1em;
    font-size: 0.8em;
    a {
      color: ${colors.linkFontColor};
      &:hover {
        color: ${colors.linkHoverColor};
      }
    }
    ${mq[0]} {
      flex-wrap: wrap;
      justify-content: center;
      transform: scale(0.85);
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
    setShowLogin(!showLogin);
  };

  const toggleRegisterModal = () => {
    setShowRegister(!showRegister);
  };

  const handleLogout = async () => {
    setCurrentUser(null);
    Cookies.remove("user");
    fetch("/auth/logout", { method: "POST" });
    navigate('/kanban-board');
  };

  return (
    <>
      <header css={header}>
        <div css={headerContent}>
          <div css={leftHeader}>
            {activeTab === "home" && currentUser ? (
              <ExpandCircleDownIcon
                css={expandSidebar}
                onClick={toggleSidebar}
              />
            ) : null}
            <h1>{title}</h1>
          </div>
          <div css={rightHeader}>
            <Link to="/kanban-board" id="home">
              Kanban Board
            </Link>
            <Link to="/kanban-board/about" id="about">
              About
            </Link>
            <button onClick={toggleTheme} css={button}>
              {theme} Theme
            </button>
            {currentUser ? (
              <UserDropdown
                currentUser={currentUser.username}
                handleLogout={handleLogout}
              />
            ) : (
              <>
                <button onClick={toggleLoginModal} css={button}>
                  Log In
                </button>
                <button onClick={toggleRegisterModal} css={button}>
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {showLogin ? <ModalLogin toggleModal={toggleLoginModal} /> : null}
      {showRegister ? (
        <ModalRegister toggleModal={toggleRegisterModal} />
      ) : null}
    </>
  );
}
