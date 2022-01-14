/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";

export default function SectionItem(props) {
  const [originalLocation, setOriginalLocation] = useState(null);
  const { name, description, dateOfCreation, id } = props;
  const [dragging, setDragging] = useState(false);
  const breakpoints = [475, 720];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const SectionItemContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    margin-bottom: 1em;
    width: 100%;
    ${mq[1]} {
      width: 70%;
      font-size: 0.8em;
    }
    &:first-of-type {
      margin-top: 2em;
    }
  `;

  const SectionItem = css`
    border: ${dragging ? "2px dashed red" : "2px solid #727272"};
    background: white;
    width: 80%;
    min-height: 100px;
    padding: 0.5em 1em;
    border-radius: 1em;
    &:hover {
      cursor: grab;
      border: 2px dashed red;
    }
  `;

  const pointerEventsNone = css`
    pointer-events: none;
  `

  const openEdit = (e) => {
    console.log(e);
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    e.dataTransfer.setData("text/plain", [name, description, dateOfCreation]);
    const targetDimensions = e.target.getBoundingClientRect();
    setOriginalLocation({
      X: targetDimensions.left - 20,
      Y: targetDimensions.top - 20,
    });
  };

  const handleDragging = (e) => {
    e.target.style.transform = `translate(${
      e.clientX - originalLocation.X
    }px, ${e.clientY - originalLocation.Y}px)`;
    if (!dragging) setDragging(true);
  };

  const handleDragEnd = (e) => {
    e.target.style.transform = "none";
    setDragging(false);
  };

  return (
    <div css={SectionItemContainer} id={id}>
      <div
        css={SectionItem}
        draggable="true"
        onClick={openEdit}
        onDragStart={handleDragStart}
        onDrag={handleDragging}
        onDragEnd={handleDragEnd}
      >
        <h2 css={dragging ? pointerEventsNone : null}>{name}</h2>
        <p css={dragging ? pointerEventsNone : null}>{description}</p>
        <p css={dragging ? pointerEventsNone : null}>{dateOfCreation}</p>
      </div>
    </div>
  );
}
