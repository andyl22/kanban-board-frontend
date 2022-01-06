/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import "../"

export default function KanbanItem(props) {
  const [originalLocation, setOriginalLocation] = useState(null);
  const { taskName, description, date } = props;

  const kanbanItem = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: fit-content;
    width: 100%;
    padding: 1em;
    border: 2px solid #727272;
    border-radius: 1em;
    margin: auto 0;
    background: white;
    &:hover {
      cursor: grab;
    }
  `;

  const handleDragStart = (e) => {
    const canvas = document.createElement("canvas");
    e.dataTransfer.setDragImage(canvas, 0, 0);
    e.dataTransfer.setData("text/plain", [taskName, description, date]);
    setOriginalLocation({X: e.clientX, Y: e.clientY});
  }

  const handleDragging = e => {
    e.target.style.transform = `translate(${e.clientX-originalLocation.X}px, ${e.clientY-originalLocation.Y}px)`
  }

  const handleDragOver = (e) => {
    e.dataTransfer.effectAllowed="move";
    e.preventDefault();
  }

  const handleDrop = (e) => {
    const data = e.dataTransfer.getData("text/plain");
    e.target.textContent = data;
  }

  const handleDragEnd = (e) => {
    e.target.style.transform = null;
  }

  useEffect(() => {
    console.log("rerendered");
  },[])

  return (
    <div css={kanbanItem} draggable="true" onDragStart={handleDragStart} onDrag={handleDragging} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}>
      <h2>{taskName}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
}
