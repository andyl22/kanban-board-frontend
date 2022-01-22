/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";

export default function Modal(props) {
  const { toggleModal, children } = props;
  const maxZ =
    Array.from(document.querySelectorAll("body *"))
      .map((a) => window.getComputedStyle(a).zIndex)
      .filter((a) => a !== "auto")
      .sort()
      .pop() + 1 || 1;

  const modal = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: ${maxZ};
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.6);
  `;

  const rolloutAnimation = keyframes`
  0% {
    transform: translateY(-100px)
  }
  100% {
    transform: translateY(0px)
`;

  const modalContent = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
    margin: 0 auto;
    max-width: 300px;
    width: 90%;
    min-width: 250px;
    text-align: center;
    background: white;
    overflow: hidden;
    animation: ${rolloutAnimation} 1s ease;
  `;

  const closeModal = (e) => {
    if (e.target.id === "modal-container") toggleModal();
  };

  return (
    <div id="modal-container" css={modal} onClick={closeModal}>
      <div id="modal-content" css={modalContent}>
        {children}
      </div>
    </div>
  );
}
