/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Dropdown from "./Dropdown";

export default function DropdownUser(props) {
  const { currentUser, handleLogout } = props

  const dropdownOption=css`
    background: #F2F2F2;
    border-radius: .2em;
    border: 1px solid #cccccc;
    font-weight: 600;
    padding: .2em 0;
    &:hover {
      cursor: pointer;
      background: #d8d8d8;
    }
  `

  return (
    <Dropdown dropDownName={currentUser.username}>
      <button css={dropdownOption} onClick={handleLogout}>Profile</button>
      <button css={dropdownOption} onClick={handleLogout}>Settings</button>
      <button css={dropdownOption} onClick={handleLogout}>Logout</button>
    </Dropdown>
  );
}
