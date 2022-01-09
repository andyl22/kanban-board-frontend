/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import React, { useContext } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ThemeContext } from "../context/ThemeProvider";

export default function UserDropdown(props) {
  const { colors } = useContext(ThemeContext);
  const userProfile = css`
    display: flex;
    align-items: center;
    p {
      font-weight: 600;
    }
  `;

  const arrow = css`
    color: ${colors.iconColor}
  `

  return (
    <div css={userProfile}>
      <p>
        {props.currentUser}
      </p>
      <ArrowDropDownIcon css={arrow}/>
    </div>
  );
}
