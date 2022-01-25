/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";

export default function ToggleButton() {
  const [buttonStatus, setButtonStatus] = useState(false);

  const toggleButtonContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5em;
  `;

  const checkbox = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 30px;
    width: 50px;
    background: #f2f2f2;
    border: 1px solid #e5e5e5;
    border-radius: 1em;
    padding: 0.2em 0.25em;
  `;

  const innerButtonContainer = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: ${buttonStatus ? "lightblue" : "lightgray"};
    width: 100%;
    height: 100%;
    border-radius: 2em;
    padding: 0.2em;
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
    }
  `;

  const checkboxIndicator = css`
    height: 100%;
    width: 45%;
    border-radius: 1em;
    background: white;
  `;

  const toggleButton = (e) => {
    console.log(e.target.checked);
    setButtonStatus(!buttonStatus);
  };

  return (
    <div css={toggleButtonContainer}>
      <label htmlFor="dark-mode">Dark Mode</label>
      <div css={checkbox}>
        <div css={innerButtonContainer}>
          <div css={checkboxIndicator}></div>
          <input type="checkbox" id="dark-mode" onChange={toggleButton} />
        </div>
      </div>
    </div>
  );
}
