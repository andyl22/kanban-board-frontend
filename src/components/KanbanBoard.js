/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React from "react";
import Section from "./Section";
import AddSectionButton from "./AddSectionButton";

const boardContainer = css`
  display: flex;
  flex: 1 1 auto;
`;

const sidebar = css`
  flex: 0;
  display: flex;
  flex-direction: column;
  padding: 1em 5em;
  box-shadow: 0px 5px 5px gray;
  z-index: 1;
`;

const sectionsContainer = css`
flex: 1;
  display: flex;
  gap: 3em;
  padding: 1em 5em;
  background: #DEDEDE;
  overflow: auto;
  &::-webkit-scrollbar {
    background: #DEDEDE;
  }
  &::-webkit-scrollbar-track {
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb62f;
    border: 4px solid #DEDEDE;
    background-clip: padding-box;
    border-radius: .5em;
  }
`;

export default function KanbanBoard(props) {
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
      <section css={sidebar}>Sidebar</section>
      <section css={sectionsContainer}>
        {mappedSections}
        <AddSectionButton />
      </section>
    </div>
  );
}
