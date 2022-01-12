/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useContext } from "react";
import Section from "./Section";
import AddSectionButton from "./AddSectionButton";
import SidebarProject from "./SidebarProject";
import { ThemeContext } from "../context/ThemeProvider";
import { UserContext } from "../context/UserProvider";

export default function KanbanBoard() {
  const { colors } = useContext(ThemeContext);
  const { currentUser } = useContext(UserContext);

  const breakpoints = [475, 720];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const boardContainer = css`
    display: flex;
    flex: 1;
    height: 0;
  `;

  const sectionsContainer = css`
    flex: 1 1 1px;
    display: flex;
    gap: 3em;
    padding: 2em 2em;
    overflow: auto;
    ${mq[1]} {
      gap: 1em;
      padding: 1em;
    }
    &::-webkit-scrollbar {
      background: ${colors.contentBackground};
    }
    &::-webkit-scrollbar-track {
    }
    &::-webkit-scrollbar-thumb {
      background: #ffb62f;
      border: 4px solid ${colors.contentBackground};
      background-clip: padding-box;
      border-radius: 0.5em;
    }
  `;

  const notLoggedInError = css`
    margin: 0 auto;
    padding: 1em 0;
    text-align: center;
    font-weight: 600;
    font-size: 2em;
    ${mq[1]} {
      font-size: 1.5em;
    }
    ${mq[0]} {
      font-size: 1em;
    }
  `

  const addNewSection = (e) => {
    console.log(e);
  }

  //API call to fetch sections for the board
  const sections = [];
  const mappedSections = sections.map((item) => (
    <Section key={item.name} name={item.name} color={item.color} />
  ));

  if (currentUser) {
    return (
      <div css={boardContainer}>
        <SidebarProject />
        <section css={sectionsContainer}>
          {mappedSections}
          <AddSectionButton/>
        </section>
      </div>
    );
  }

  return (
    <p css={notLoggedInError}>Please sign in to access your projects.</p>
  );
}
