/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";

export default function Header(props) {
  const {theme, toggleTheme, colors} = useContext(ThemeContext);
  const { activeTab } = props;
  console.log(theme);

  useEffect(() => {
    document
      .getElementById(activeTab)
      .setAttribute("style", `border-bottom: 2px solid ${colors.linkFontColor}`);
  });

  const header = css`
    border-bottom: 2px solid #f2f2f2;
    background: ${colors.headerBackground};
  `;

  const headerContent = css`
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    padding: 0.8em 3em;
    h1 {
      color: ${colors.headingColor}
    }
  `;

  const rightHeader = css`
    display: flex;
    align-items: center;
    gap: 2em;
    font-weight: 600;
    font-size: 0.8em;
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
    border-radius: .3em 1em;
    border: none;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      background: #0F46FF;
      transform: scale(1.05);
      transition: .1s ease-in;
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
        <h1>Kanban</h1>
        <div css={rightHeader}>
          <Link to="/" id="home">
            Kanban Board
          </Link>
          <Link to="/project-list" id="project-list">
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
