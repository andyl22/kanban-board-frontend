/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React from "react";
import KanbanItem from "./KanbanItem";

export default function Section(props) {
  const { name, color } = props;
  const breakpoints = [425, 720];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const section = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: fit-content;
    text-align: center;
    border-radius: 1em;
    background: white;
    &:-moz-drag-over {
      outline: 1px solid black;
    }
    h1 {
      width: 100%;
      padding: 0.5em;
      background: ${color || "white"};
      border-bottom: 2px solid black;
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
      color: black !important;
    }
  `;

  const kanbanItemsContainer = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 280px;
    min-width: 200px;
    ${mq[1]} {
      width: 100%;
      padding: .8em .4em;
      gap: .4em;
    }
    height: fit-content;
    padding: 1em 1em;
    flex-wrap: wrap;
    gap: 15px;
  `;

  // Implement API to fetch kanban items by section id
  const kanbanItems = [
  ];

  const mappedKanbanItems = kanbanItems.map((item) => (
    <KanbanItem
      taskName={item.taskName}
      description={item.description}
      date={item.date}
      id={item.id}
      key={item.id}
    />
  ));

  return (
    <section id={name} css={section}>
      <h1>{name}</h1>
      <div css={kanbanItemsContainer}>
        {mappedKanbanItems}
      </div>
    </section>
  );
}
