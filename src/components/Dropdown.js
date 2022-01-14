/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Dropdown(props) {
  const { children, dropDownName } = props;
  const [showDropDown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropDown);
  };

  const { colors } = useContext(ThemeContext);

  const dropDownContainer = css`
    position: relative;
  `;

  const userProfile = css`
    display: flex;
    align-items: center;
    color: ${colors.linkFontColor};
    &:hover {
      cursor: pointer;
      color: ${colors.linkHoverColor};
    }
    p {
      font-weight: 600;
      color: inherit;
    }
  `;

  const dropDown = css`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    position: absolute;
    top: 2em;
    right: 0;
    border-radius: 0.4em;
    padding: 0.5em;
    min-width: 100px;
    z-index: 2;
    background: ${colors.contentBackground};
    border: 2px solid ${colors.borderColor};
  `;

  return (
    <div css={dropDownContainer}>
      <div css={userProfile} onClick={toggleDropdown}>
        <p>{dropDownName}</p>
        <ArrowDropDownIcon/>
      </div>
      {showDropDown ? <div css={dropDown}> {children} </div> : null}
    </div>
  );
}
