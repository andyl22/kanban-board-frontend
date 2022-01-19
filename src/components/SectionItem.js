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
      align-items: center;
      justify-content: center;
      background: white;
      height: 100px;
      width: 80%;
      border-radius: 1em;
      margin-bottom: 1em;
      background: white;
      border: ${snapshot.isDragging ? "2px dashed red" : "1px solid #cccccc"};
      overflow: hidden;
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
