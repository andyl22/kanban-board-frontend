/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import moment from 'moment';

export default function SectionItemContent(props) {
  const { colors } = useContext(ThemeContext);

  const sectionItemContent = css`
    flex: 1;
    display: flex;
    text-align: start;
    height: 100%;
    padding: .2em 1em;
    flex-direction: column;
    overflow: auto;
    &::-webkit-scrollbar {
      border-bottom-right-radius: 2em;
    }
    &::-webkit-scrollbar-thumb {
      background: ${colors.scrollbar};
      border: 7px solid white;
      border-radius: 2em;
    }
    h2, p {
      color: black;
    }
    h2 {
      font-size: 1em;
      margin-bottom: .3em;
    }
    p {
      font-size: .85em;
      margin-bottom: .1em;
    }
  `

  const { item } = props;

  return (
    <div css={sectionItemContent}>
      <h2>{item.name}</h2>
      <p>Description: {item.description}</p>
      <p>Created: {moment(item.date_of_creation).fromNow()}</p>
    </div>
  );
}
