/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteSectionItemController from "./DeleteSectionItemController";

export default function SectionItemButton(props) {
  const { item } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleDeleteModal = () => {
    setShowDelete(!showDelete);
  };

  const editItem = () => {
    setShowEdit(!showEdit);
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
    <>
      <div css={manipulateItemButtons} onClick={editItem}>
        <button css={button}>
          <EditIcon fontSize="small" />
        </button>
        <button css={button} onClick={toggleDeleteModal}>
          <DeleteForeverIcon fontSize="small" />
        </button>
      </div>
      {showDelete ? (
        <DeleteSectionItemController
          item={item}
          toggleModal={toggleDeleteModal}
        />
      ) : null}
    </>
  );
}
