/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { Draggable } from "react-beautiful-dnd";

export default function SectionItem(props) {
  const { item } = props;
  const { colors, mq } = useContext(ThemeContext);

  const SectionItem = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #727272;
    background: white;
    padding: 1em;
    min-height: 100px;
    width: 80%;
    border-radius: 1em;
    margin-bottom: 1em;
    ${mq[1]} {
      font-size: 0.8em;
    }
    &:active {
      border: 2px dashed red;
    }
  `;

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          css={SectionItem}
        >
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>{item.date_of_creation}</p>
        </div>
      )}
    </Draggable>
  );
}
