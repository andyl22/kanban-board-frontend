/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, {useContext} from "react";
import Section from "./Section";
import AddSectionButton from "./AddSectionButton";
import Sidebar from "./Sidebar";
import { ThemeContext } from "../context/ThemeProvider";

export default function KanbanBoard(props) {
  const { colors } = useContext(ThemeContext);
  
  const boardContainer = css`
  display: flex;
  flex: 1 1 auto;
`;

const sectionsContainer = css`
flex: 1;
  display: flex;
  gap: 3em;
  padding: 1em 5em;
  overflow: auto;
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
      <Sidebar />
      <section css={sectionsContainer}>
        {mappedSections}
        <AddSectionButton />
      </section>
    </div>
  );
}
