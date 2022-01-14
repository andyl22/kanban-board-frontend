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

  const SectionItem = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: fit-content;
    width: 100%;
    padding: 1em;
    border: ${dragging ? "2px dashed red" : "2px solid #727272"};
    border-radius: 1em;
    margin: auto 0;
    background: white;
    ${mq[1]} {
      width: 80%;
      font-size: 0.8em;
    }
    &:hover {
      cursor: grab;
      border: 2px dashed red;
    }
    h2,
    p {
      color: black !important;
    }
  `;

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

  const handleDragOver = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const data = e.dataTransfer.getData("text/plain");
    e.target.textContent = data;
  };

  const handleDragEnd = (e) => {
    e.target.style.transform = "none";
    setDragging(false);
  };

  return (
    <div
      css={SectionItem}
      draggable="true"
      onDragStart={handleDragStart}
      onDrag={handleDragging}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      id={id}
    >
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{dateOfCreation}</p>
    </div>
  );
}
