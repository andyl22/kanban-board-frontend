/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { Draggable } from "react-beautiful-dnd";

export default function SectionItem(props) {
  const { item } = props;
  const { colors, mq } = useContext(ThemeContext);

  const SectionItem = (snapshot) => {
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: white;
      padding: 1em;
      min-height: 100px;
      width: 80%;
      border-radius: 1em;
      margin-bottom: 1em;
      background: white;
      border: ${snapshot.isDragging ? "2px dashed red" : "2px solid #727272"};
      ${mq[1]} {
        font-size: 0.8em;
      }
      h2, p {
        color: black;
      }
    `;
  };

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          css={SectionItem(snapshot)}
          ref={provided.innerRef}
        >
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>{item.date_of_creation}</p>
        </div>
      )}
    </Draggable>
  );
}
