/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function IconAdd() {
  const button = css`
    color: #5c81ff;
    &:hover {
      color: #0f46ff;
      cursor: pointer;
      outline: none;
    }
  `;

  return (
    <AddCircleIcon css={button}/>
  )
}
