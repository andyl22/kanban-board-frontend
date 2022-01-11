/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useEffect } from "react";

export default function Modal({ children }) {
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
    position: absolute;
    z-index: ${maxZ};
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
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
    max-width: 90%;
    min-width: 250px;
    text-align: center;
    background: white;
    overflow: hidden;
    animation: ${rolloutAnimation} 1s ease;
  `;

  useEffect(() => {
    console.log(maxZ);
  })

  return (
    <div css={modal}>
      <div id="modal-content" css={modalContent}>
        {children}
      </div>
    </div>
  );
}
