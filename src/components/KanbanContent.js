/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import ProjectHeader from "./ProjectHeader";
import AddSectionController from "./AddSectionController";
import { useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { DragDropContext } from "react-beautiful-dnd";
import { SectionsContext } from "../context/SectionsProvider";
import { postHTTP } from "../utilities/fetchAPIs";

export default function KanbanContent(props) {
  const { children, project } = props;
  const { sections, dispatch } = useContext(SectionsContext);
  const { colors, mq } = useContext(ThemeContext);
  const sectionRef = useRef();

  const kanbanContentContainer = css`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
  `;
  const content = css`
    display: flex;
    gap: 2em;
    padding: 2em;
    height: 100%;
    min-width: 0;
    overflow: auto;
    &::-webkit-scrollbar {
      background: none;
    }
    &::-webkit-scrollbar-corner {
      background-color: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar-thumb {
      background: ${colors.scrollbar};
      border: 4px solid ${colors.contentBackground};
      padding: 0 2em;
      background-clip: content-box;
      border-radius: 0.5em;
    }
    ${mq[0]} {
      flex-wrap: wrap;
      justify-content: center;
    }
  `;

  // Set the drag results for the DragDropContext if it is a valid drop
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sectionItems = sections.itemsList;
    const sourceIndex = sectionItems.indexOf(
      sectionItems.filter((item) => item.sectionID === source.droppableId)[0]
    );
    const destinationIndex = sectionItems.indexOf(
      sectionItems.filter(
        (item) => item.sectionID === destination.droppableId
      )[0]
    );

    const copyOfItems = JSON.parse(JSON.stringify(sectionItems));
    const dragItem = copyOfItems[sourceIndex].items.filter(
      (item) => item._id === draggableId
    )[0];

    copyOfItems[sourceIndex].items.splice(source.index, 1);
    copyOfItems[destinationIndex].items.splice(destination.index, 0, dragItem);
    dispatch({ type: "SETITEMS", sectionItems: copyOfItems });

    postHTTP("/sectionItem/moveItem", {
      id: draggableId,
      updatedSectionID: destination.droppableId,
    }).catch((err) =>
      dispatch({ type: "SETITEMS", sectionItems: sectionItems })
    );
  };

  useEffect(() => {
    if (sectionRef.current !== undefined) {
      sectionRef.current.scrollTo(0, 0);
    }
  }, []);

  return (
    <div css={kanbanContentContainer}>
      <ProjectHeader headerTitle={project.name} />
      <div css={content} ref={sectionRef}>
        <DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>
        <AddSectionController />
      </div>
    </div>
  );
}
