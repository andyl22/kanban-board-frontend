/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import DragHandle from "./DragHandle";
import SectionItemContent from "./SectionItemContent";
import SectionItemButton from "./SectionItemButtons";

export default function SectionItem(props) {
  const { item } = props;
  const [showButtons, setShowButtons] = useState(false);

  const itemContainer = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-bottom: 1.5em;
  `;

  const SectionItem = (snapshot) => {
    return css`
      display: flex;
      background: white;
      height: fit-content;
      width: 90%;
      border-radius: 1em;
      border: ${snapshot.isDragging ? "1px dashed red" : "1px solid #cccccc"};
      overflow: hidden;
      &:hover {
        box-shadow: -3px 3px 7px #f2f2f2;
        cursor: pointer;
      }
    `;
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div css={itemContainer} onDoubleClick={toggleButtons}>
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
      {showButtons ? <SectionItemButton item={item} /> : null}
    </div>
  );
}
