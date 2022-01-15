/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import SectionItem from "./SectionItem";
import AddSectionItemController from "./AddSectionItemController";
import { ThemeContext } from "../context/ThemeProvider";
import { postHTTP } from "../utilities/fetchAPIs";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Section(props) {
  const { name, sectionID, color } = props;
  const [sectionItems, setSectionItems] = useState([]);
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
    height: fit-content;
    text-align: center;
    border-radius: 1em;
    background: white;
    gap: 2em;
    box-shadow: -1px 3px 5px ${colors.shadowColor};
    animation: ${rolloutY} 0.2s ease-in;
    &:-moz-drag-over {
      outline: 1px solid black;
    }
    h1 {
      padding: 1em;
      background: ${color || "#ffce1c"};
      border-bottom: 2px solid black;
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
      color: black !important;
    }
  `;

  const sectionItemsContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    min-width: 200px;
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
    postHTTP("/sectionItem/sectionItemsBySectionID", { sectionID: sectionID })
      .then((res) => setSectionItems(res.sections))
      .catch((err) => console.log(err));
  }, [sectionID]);

  const mappedSectionItems = sectionItems.map((item, index) => (
    <SectionItem item={item} key={item._id} index={index} id={item._id} />
  ));

  const handleDragStart = () => {};

  const handleDragUpdate = () => {};

  const handleDragEnd = () => {};
  
  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onDragEnd={handleDragEnd}
    >
      <section id={sectionID} css={section}>
        <h1>{name}</h1>
        <Droppable droppableId={props.sectionID}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              css={sectionItemsContainer}
            >
              {mappedSectionItems}
              <AddSectionItemController
                addSectionItem={addSectionItem}
                sectionID={sectionID}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </section>
    </DragDropContext>
  );
}
