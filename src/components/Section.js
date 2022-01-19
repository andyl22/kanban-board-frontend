/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import SectionItem from "./SectionItem";
import AddSectionItemController from "./AddSectionItemController";
import { ThemeContext } from "../context/ThemeProvider";
import { Droppable } from "react-beautiful-dnd";
import { SectionsContext } from "../context/SectionsProvider";

export default function Section(props) {
  const { id, name } = props;
  const [mappedSectionItems, setMappedSectionItems] = useState(null);
  const { colors, mq } = useContext(ThemeContext);
  const { sections } = useContext(SectionsContext);

  const rolloutY = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
    transform-origin: left;
  }
  100% {
    transform: translateY(0px);
  }
`;

  const section = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    text-align: center;
    border-radius: 1em;
    background: white;
    box-shadow: -3px 10px 10px ${colors.shadowColor};
    animation: ${rolloutY} 0.2s ease-in;
    &:-moz-drag-over {
      outline: 1px solid black;
    }
    h1 {
      width: 100%;
      padding: 1em;
      background: #ffce1c;
      border-bottom: 2px solid #727272;
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
      color: black !important;
    }
  `;

  const sectionItemsContainer = (snapshot) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    min-width: 200px;
    padding-top: 2em;
    background: ${snapshot.isDraggingOver ? "#c0e4ff" : "white"};
    ${mq[1]} {
      width: 100%;
      padding: 0.8em 0.4em;
      gap: 0.5em;
    }
  `;

  // map items of the section to SectionItem components
  useEffect(() => {
    const sectionItems = sections.items.filter(item => item.sectionID === id)[0].items;
    if (!sectionItems) return;
    setMappedSectionItems(
      sectionItems.map((item, index) => (
        <SectionItem item={item} key={item._id} index={index} id={item._id} />
      ))
    );
  }, [id, sections]);

  return (
    <section id={id} css={section}>
      <h1>{name}</h1>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            css={sectionItemsContainer(snapshot)}
          >
            {mappedSectionItems}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddSectionItemController sectionID={id} />
    </section>
  );
}
