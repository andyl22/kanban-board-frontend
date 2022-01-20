/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ModalHeader(props) {
  const { toggleModal, title } = props;
  const header = css`
    flex: 0;
    display: flex;
    justify-content: space-between;
    background: #5c81ff;
    width: 100%;
    word-break: break-word;
    padding: 0.5em 0.5em;
    h1 {
      margin: 0 auto;
      color: white;
    }
  `;

  const button = css`
    color: white;
    &:hover {
      cursor: pointer;
      color: #d9d9d9;
    }
  `;

  return (
    <div css={header}>
      <h1>{title}</h1>
      <CancelIcon css={button} onClick={toggleModal} />
    </div>
  );
}
