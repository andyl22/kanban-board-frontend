/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import IconAdd from "./IconAdd";

export default function buttonAdd(props) {
  const { onClickAction } = props

  const button = css`
    background: none;
    border: none;
  `;

  return (
    <button onClick={onClickAction} css={button}>
      <IconAdd />
    </button>
  );
}
