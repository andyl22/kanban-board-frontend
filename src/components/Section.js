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
  const { name, sectionDetails, color } = props;
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
    box-shadow: -3px 10px 30px ${colors.shadowColor};
    animation: ${rolloutY} 0.2s ease-in;
    &:-moz-drag-over {
      outline: 1px solid black;
    }
    h1 {
      width: 100%;
      padding: 1em;
      background: ${color || "#ffce1c"};
      border-bottom: 2px solid black;
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
      color: black !important;
    }
  `;

  const sectionItemsContainer = snapshot => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em 0;
    width: 280px;
    min-width: 200px;
    background: ${snapshot.isDraggingOver ? "#f2f2f2" : "white"};
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

  const handleDragStart = () => {};

  const handleDragUpdate = () => {};

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newSectionItems = [...sectionItems];
    newSectionItems.splice(source.index, 1);
    newSectionItems.splice(
      destination.index,
      0,
      sectionItems.filter((item) => item._id === draggableId)[0]
    );
    setSectionItems(newSectionItems);
  };

  useEffect(() => {
    setMappedSectionItems(
      sectionItems.map((item, index) => (
        <SectionItem item={item} key={item._id} index={index} id={item._id} />
      ))
    );
  }, [sectionItems]);

  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onDragEnd={handleDragEnd}
    >
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
    </DragDropContext>
  );
}
