/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import moment from "moment";

export default function SectionItemContent(props) {
  const { item } = props;
  const { colors, mq } = useContext(ThemeContext);

  const sectionItemContent = css`
    position: relative;
    align-items: flex-start;
    text-align: start;
    max-height: 100px;
    padding: 0.2em 1em;
    word-break: break-word;
    overflow: auto;
    &::-webkit-scrollbar {
      border-bottom-right-radius: 2em;
    }
    &::-webkit-scrollbar-thumb {
      background: ${colors.scrollbar};
      border: 7px solid white;
      border-radius: 2em;
    }
    h2,
    p {
      color: black;
    }
    h2 {
      font-size: 1em;
      margin-bottom: 0.3em;
    }
    p {
      font-size: 0.85em;
      margin-bottom: 0.1em;
      ${mq[0]} {
        display: none;
      }
    }
  `;

  return (
    <div css={sectionItemContent}>
      <h2>{item.name}</h2>
      <p>Description: {item.description}</p>
      <p>Created: {moment(item.date_of_creation).fromNow()}</p>
    </div>
  );
}
