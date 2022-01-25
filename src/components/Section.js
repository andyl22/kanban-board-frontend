/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { Droppable } from "react-beautiful-dnd";
import { SectionsContext } from "../context/SectionsProvider";
import SectionHeader from "./SectionHeader";
import SectionItem from "./SectionItem";
import AddSectionItemController from "./AddSectionItemController";

export default function Section(props) {
  const { section } = props;
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

  const sectionContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    text-align: center;
    border-radius: 1em;
    background: white;
    box-shadow: -3px 10px 10px ${colors.shadowColor};
    animation: ${rolloutY} 0.2s ease-in;
    max-width: 300px;
    &:-moz-drag-over {
      outline: 1px solid black;
    }
    ${mq[0]} {
      min-width: 100px;
      width: 100%;
    }
  `;

  const sectionItemsContainer = (snapshot) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    padding-top: 2em;
    background: ${snapshot.isDraggingOver ? "#c0e4ff" : "white"};
    ${mq[0]} {
      width: 100%;
    }
  `;

  // map items of the section to SectionItem components
  useEffect(() => {
    const filteredSection = sections.itemsList.filter(
      (item) => item.sectionID === section._id
    )[0];
    if (!filteredSection) return;
    const sectionItems = filteredSection.items;
    if (!sectionItems) return;
    setMappedSectionItems(
      sectionItems.map((item, index) => (
        <SectionItem item={item} key={item._id} index={index} id={item._id} />
      ))
    );
  }, [section._id, sections]);

  return (
    <section id={section._id} css={sectionContainer}>
      <SectionHeader section={section}/>
      <Droppable droppableId={section._id}>
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
      <AddSectionItemController sectionID={section._id} />
    </section>
  );
}
