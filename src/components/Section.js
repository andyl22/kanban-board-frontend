/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import SectionItem from "./SectionItem";
import AddSectionItemController from "./AddSectionItemController";
import { ThemeContext } from "../context/ThemeProvider";
import { postHTTP } from "../utilities/fetchAPIs";
import { Droppable } from "react-beautiful-dnd";

export default function Section(props) {
  const { name, sectionDetails, color, dragResult } = props;
  const [sectionItems, setSectionItems] = useState([]);
  const [mappedSectionItems, setMappedSectionItems] = useState([]);
  const { colors, mq } = useContext(ThemeContext);

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
      background: ${color || "#ffce1c"};
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

  const addSectionItem = (sectionItem) => {
    setSectionItems([...sectionItems, sectionItem]);
  };

  useEffect(() => {
    postHTTP("/sectionItem/sectionItemsBySectionID", {
      sectionID: sectionDetails._id,
    })
      .then((res) => setSectionItems(res.sections))
      .catch((err) => console.log(err));
  }, [sectionDetails._id]);

  useEffect(() => {
    if (dragResult) {
      if (dragResult.destination.droppableId === sectionDetails._id) {
        console.log(dragResult);
      }
    }
    setMappedSectionItems(
      sectionItems.map((item, index) => (
        <SectionItem item={item} key={item._id} index={index} id={item._id} />
      ))
    );
  }, [sectionItems, dragResult]);

  return (
    <section id={sectionDetails._id} css={section}>
      <h1>{name}</h1>
      <Droppable droppableId={sectionDetails._id}>
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
      <AddSectionItemController
        addSectionItem={addSectionItem}
        sectionID={sectionDetails._id}
      />
    </section>
  );
}
