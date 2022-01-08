/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Modal from "./Modal";
import { ThemeContext } from "../context/ThemeProvider";
import { useContext } from "react";

export default function LoginModal(props) {
  const { colors } = useContext(ThemeContext);
  const { setShowLogin } = props;

  const modalContent = css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    max-width: 600px;
    height: 400px;
    border: 0.2em solid ${colors.borderColor};
    border-radius: 1em;
    margin: 0 auto;
    text-align: center;
    background: ${colors.contentBackground};
    overflow: hidden;
  `;

  const header = css`
    flex: 0;
    background: ${colors.headerBackground};
    padding: 0.5em 1em;
  `;

  const content = css`
    flex: 1;
  `;

  const handleClick = (e) => {
    if (e.target.id.includes("modal-content")) return;
    setShowLogin(false);
  };

  return (
    <Modal onClick={handleClick}>
      <div id="modal-content" css={modalContent}>
        <div css={header}>
          <h1>Why Hello There</h1>
        </div>
        <div css={content}></div>
      </div>
    </Modal>
  );
}
