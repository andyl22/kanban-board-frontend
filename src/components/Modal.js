/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React from "react";

export default function Modal({ children }) {
  const maxZ =
    Array.from(document.querySelectorAll("body *"))
      .map((a) => window.getComputedStyle(a).zIndex)
      .filter((a) => a !== "auto")
      .sort()
      .pop() + 1;

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
    background: rgba(0, 0, 0, .6)
  `;

  return <div css={modal}>{children}</div>;
}
