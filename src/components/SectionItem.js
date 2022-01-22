/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import DragHandle from "./DragHandle";
import SectionItemContent from "./SectionItemContent";
import SectionItemButton from "./SectionItemButtons";
import DeleteSectionItemController from "./DeleteSectionItemController";
import EditSectionItemController from "./EditSectionItemController";

export default function SectionItem(props) {
  const { item } = props;
  const [showButtons, setShowButtons] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
      border: ${snapshot.isDragging
        ? "1px dashed red"
        : showButtons
        ? "1px solid red"
        : "1px solid #cccccc"};
      overflow: hidden;
      &:hover {
        box-shadow: -3px 3px 7px #f2f2f2;
        cursor: pointer;
      }
      &:hover {
        border: 1px dashed red;
      }
    `;
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const toggleEditModal = () => {
    setShowEdit(!showEdit);
  };

  const toggleDeleteModal = () => {
    setShowDelete(!showDelete);
  };

  return (
    <div css={itemContainer}>
      <Draggable draggableId={props.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            css={SectionItem(snapshot)}
            ref={provided.innerRef}
            onClick={toggleButtons}
          >
            <DragHandle {...provided.dragHandleProps} />
            <SectionItemContent item={item} />
          </div>
        )}
      </Draggable>
      {showButtons ? (
        <SectionItemButton
          item={item}
          toggleDeleteModal={toggleDeleteModal}
          toggleEditModal={toggleEditModal}
          toggleButtons={toggleButtons}
        />
      ) : null}
      {showDelete ? (
        <DeleteSectionItemController
          item={item}
          toggleModal={toggleDeleteModal}
        />
      ) : null}
      {showEdit ? (
        <EditSectionItemController item={item} toggleModal={toggleEditModal} />
      ) : null}
    </div>
  );
}
