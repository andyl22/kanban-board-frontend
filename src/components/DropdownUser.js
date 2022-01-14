/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Dropdown from "./Dropdown";

export default function DropdownUser(props) {
  const { currentUser, handleLogout } = props

  const dropdownOption=css`
    background: #F2F2F2;
    border-radius: 1em;
    padding: .2em 0;
    &:hover {
      cursor: pointer;
    }
  `

  return (
    <Dropdown dropDownName={currentUser.username}>
      <span css={dropdownOption} onClick={handleLogout}>Logout</span>
    </Dropdown>
  );
}
