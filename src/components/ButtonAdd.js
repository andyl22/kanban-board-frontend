/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import IconAdd from "./IconAdd";

export default function buttonAdd(props) {
  const { onClickAction, customCSS } = props

  const button = css`
    background: none;
    border: none;
    height: fit-content;
  `;

  return (
    <button onClick={onClickAction} css={button}>
      <IconAdd />
    </button>
  );
}
