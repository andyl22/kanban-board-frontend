/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function SectionHeader(props) {
  const { name } = props;
  const sectionHeader = css`
    display: flex;
    position: relative;
    justify-content: space-between;
    width: 100%;
    padding: 1em;
    background: #ffce1c;
    border-bottom: 2px solid #727272;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    color: black !important;
    word-break: break-word;
  `;

  const text = css`
    margin: 0 auto;
    padding: 0 1em;
  `;

  const buttonsContainer = css`
    position: absolute;
    transform: scale(0.8);
    right: 0.5em;
  `;

  const buttons = css`
    color: black;
    &:hover {
      cursor: pointer;
      color: gray;
    }
  `;

  return (
    <div css={sectionHeader}>
      <h1 css={text}>{name}</h1>
      <div css={buttonsContainer}>
        <EditIcon fontSize="small" css={buttons} />
        <DeleteForeverIcon fontSize="small" css={buttons} />
      </div>
    </div>
  );
}
