/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useState } from "react";

export default function ToggleButton(props) {
  const { handleChange, buttonState } = props;
  const [buttonStatus, setButtonStatus] = useState(buttonState || false);
  const [allowAnimate, setAllowAnimate] = useState(false);

  const toggleButtonContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5em;
  `;

  const checkbox = css`
    display: flex;
    align-items: center;
    height: 30px;
    min-width: 60px;
    background: ${buttonStatus ? "#5392ff" : "lightgray"};;
    border: 1px solid #c3c3c3;
    border-radius: 2em;
    padding: 0.3em .25em .25em .25em;
    position: relative;
    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      left: 0;
      top: 0;
      padding: inherit;
      width: 100%;
      height: 100%;
      &:hover {
        cursor: pointer;
      }
  `;

  const animation = keyframes`
  0% {
    width: 40%;
    right: ${buttonStatus ? "1.8em" : "0.3em"};
  }
  100% {
    width: 38%;
    right: ${buttonStatus ? ".3em" : "1.8em"};
  }
`;

  const checkboxIndicator = css`
    position: absolute;
    right: ${buttonStatus ? "0.3em" : null};
    animation: ${allowAnimate
      ? css`
          ${animation} 0.2s ease-in
        `
      : null};
    height: 80%;
    width: 38%;
    border-radius: 1em;
    background: white;
  `;

  const toggleButton = (e) => {
    if (!allowAnimate) setAllowAnimate(true);
    setButtonStatus(!buttonStatus);
    handleChange(e);
  };

  return (
    <div css={toggleButtonContainer}>
      <label htmlFor="dark-mode">Dark Mode</label>
      <div css={checkbox}>
        <div css={checkboxIndicator}></div>
        <input type="checkbox" id="darkMode" onChange={toggleButton} />
      </div>
    </div>
  );
}
