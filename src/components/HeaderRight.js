/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { UserContext } from "../context/UserProvider";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import DropdownUser from "./DropdownUser";
import Cookies from "js-cookie";

export default function HeaderRight() {
  const { darkMode, toggleDarkMode, colors, mq } = useContext(ThemeContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

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
      font-size: 0.7em;
    }
  `;

  const button = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: ${colors.button};
    color: white;
    padding: 0.4em 1em;
    line-height: 1em;
    border-radius: 0.3em 1em;
    border: none;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      background: ${colors.buttonHover};
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
    Cookies.remove("darkMode");
    if (darkMode) toggleDarkMode();
    fetch("/auth/logout", { method: "POST" });
    navigate("/kanban-board");
  };

  const rightHeaderLinks = (
    <>
      <Link to="/kanban-board" id="home">
        Kanban Board
      </Link>
      <Link to="/kanban-board/about" id="about">
        About
      </Link>
    </>
  );

  const userAuthButtons = (
    <>
      <button onClick={toggleLoginModal} css={button}>
        Log In
      </button>
      <button onClick={toggleRegisterModal} css={button}>
        Register
      </button>
    </>
  );

  const conditionalRendering = currentUser ? (
    <DropdownUser currentUser={currentUser} handleLogout={handleLogout} />
  ) : (
    userAuthButtons
  );

  return (
    <>
      <div css={rightHeader}>
        {rightHeaderLinks}
        {conditionalRendering}
      </div>
      {showLogin ? <ModalLogin toggleModal={toggleLoginModal} /> : null}
      {showRegister ? (
        <ModalRegister toggleModal={toggleRegisterModal} />
      ) : null}
    </>
  );
}
