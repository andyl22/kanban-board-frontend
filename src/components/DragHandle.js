/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default function DragHandle(props) {
  const dragHandle=css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f2f2f2;
    color: gray;
  `

  return (
    <div {...props} css={dragHandle}>
      <DragIndicatorIcon/>
    </div>
  )
}