/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, {useContext} from "react";
import Section from "./Section";
import AddSectionButton from "./AddSectionButton";
import SidebarProject from "./SidebarProject";
import { ThemeContext } from "../context/ThemeProvider";

export default function KanbanBoard() {
  const { colors } = useContext(ThemeContext);
  const breakpoints = [425, 720];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
  
  const boardContainer = css`
  display: flex;
  flex: 1;
  height: 100%;
`;

const sectionsContainer = css`
  flex: 1;
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
    border-radius: .5em;
  }
`;

  //API call to fetch sections for the board
  const sections=[
    {name: "Uncategorized", color: "white"},
    {name: "To Do", color: "#FF9F7E"},
    {name: "In Progress", color: "#FFD06F"},
    {name: "Done", color: "#55B858"},
  ];
  const mappedSections = sections.map((item) => (
    <Section key={item.name} name={item.name} color = {item.color}/>
  ));

  return (
    <div css={boardContainer}>
      <SidebarProject />
      <section css={sectionsContainer}>
        {mappedSections}
        <AddSectionButton />
      </section>
    </div>
  );
}
