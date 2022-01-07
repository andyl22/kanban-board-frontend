/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  const { activeTab } = props;

  useEffect(() => {
    document
      .getElementById(activeTab)
      .setAttribute("style", "border-bottom: 2px solid #555; color: #555;");
  }, [activeTab]);

  const header = css`
    border-bottom: 2px solid #f2f2f2;
    background: white;
  `;

  const headerContent = css`
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    padding: 0.8em 3em;
  `;

  const rightHeader = css`
    display: flex;
    align-items: center;
    gap: 2em;
    font-weight: 600;
    font-size: 0.8em;
    a {
      padding: 0 0 0.2em 0;
      color: #737373;
      &:hover {
        color: #999;
      }
    }
  `;

  const button = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #5c81ff;
    color: white;
    font-weight: 500;
    padding: 0.4em 1em;
    line-height: 1em;
    border-radius: 0.2em 1em;
    border: none;
    &:hover {
      cursor: pointer;
      background: #0F46FF;
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
          <button onClick={handleSignIn} css={button}>
            Log In
          </button>
        </div>
      </div>
    </header>
  );
}
