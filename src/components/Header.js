/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { UserContext } from "../context/UserProvider";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

export default function Header(props) {
  const { colors, mq } = useContext(ThemeContext);
  const { currentUser } = useContext(UserContext);
  const { title, activeTab } = props;

  useEffect(() => {
    document
      .getElementById(activeTab)
      .setAttribute(
        "style",
        `border-bottom: 2px solid ${colors.linkFontColor}`
      );
  }, [currentUser, activeTab, colors.linkFontColor]);

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

  return (
    <>
      <header css={header}>
        <div css={headerContent}>
          <HeaderLeft title={title} activeTab={activeTab} />
          <HeaderRight />
        </div>
      </header>
    </>
  );
}
