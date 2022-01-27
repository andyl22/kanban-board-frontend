/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

export default function DropdownUser(props) {
  const { currentUser, handleLogout } = props;

  const dropdownOption = css`
    background: #f2f2f2;
    border-radius: 0.2em;
    border: 1px solid #cccccc;
    font-weight: 600;
    padding: 0.2em 0;
    &:hover {
      cursor: pointer;
      background: #f0f0f0;
      color: gray;
      a {
        color: gray;
      }
    }
    a {
      color: black;
    }
  `;

  return (
    <Dropdown dropDownName={currentUser.username}>
      <button css={dropdownOption}>
        <Link to="/kanban-board/profile" id="settings">
          Profile
        </Link>
      </button>
      <button css={dropdownOption}>
        <Link to="/kanban-board/settings" id="settings">
          Settings
        </Link>
      </button>
      <button css={dropdownOption} onClick={handleLogout}>
        Logout
      </button>
    </Dropdown>
  );
}
