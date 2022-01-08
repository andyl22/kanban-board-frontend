/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React from "react";
import KanbanItem from "./KanbanItem";

export default function Section(props) {
  const { name, color } = props;

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
      padding: 0.2em 0.5em;
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
    height: fit-content;
    padding: 1em 1em;
    flex-wrap: wrap;
    gap: 15px;
  `;

  // Implement API to fetch kanban items by section id
  const kanbanItems = [
    { taskName: "test1", description: "test1", date: "test1", id: "1" },
    { taskName: "test2", description: "test2", date: "test2", id: "2" },
    { taskName: "test3", description: "test3", date: "test3", id: "3" },
    { taskName: "test4", description: "test4", date: "test4", id: "4" },
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
