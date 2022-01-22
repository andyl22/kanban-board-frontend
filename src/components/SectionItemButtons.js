/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function SectionItemButton(props) {
  const { toggleDeleteModal, toggleButtons } = props;
  const [showEdit, setShowEdit] = useState(false);

  const editItem = () => {
    toggleButtons();
    setShowEdit(!showEdit);
  };

  const showDeleteModal = () => {
    toggleButtons();
    toggleDeleteModal();
  };

  const manipulateItemButtons = css`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    transform: scale(0.8);
  `;

  const button = css`
    color: #4d4d4d;
    background: none;
    border: none;
    &:hover {
      cursor: pointer;
      color: gray;
    }
  `;

  return (
    <div>
      <div css={manipulateItemButtons} onClick={editItem}>
        <button css={button}>
          <EditIcon fontSize="small" />
        </button>
        <button css={button} onClick={showDeleteModal}>
          <DeleteForeverIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
