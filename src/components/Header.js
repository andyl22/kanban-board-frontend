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
        </div>
      </div>
    </header>
  );
}
