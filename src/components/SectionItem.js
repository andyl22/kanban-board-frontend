/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { Draggable } from "react-beautiful-dnd";
import DragHandle from "./DragHandle";
import SectionItemContent from "./SectionItemContent";

export default function SectionItem(props) {
  const { item } = props;

  const SectionItem = (snapshot) => {
    return css`
      display: flex;
      background: white;
      height: fit-content;
      width: 85%;
      border-radius: 1em;
      margin-bottom: 1em;
      border: ${snapshot.isDragging ? "1px dashed red" : "1px solid #cccccc"};
      overflow: hidden;
      &:hover {
        box-shadow: -3px 5px 8px #bfbfbf;
      }
    `;
  };

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          css={SectionItem(snapshot)}
          ref={provided.innerRef}
        >
          <DragHandle {...provided.dragHandleProps} />
          <SectionItemContent item={item} />
        </div>
      )}
    </Draggable>
  );
}
