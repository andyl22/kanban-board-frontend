/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import FormUpdateProjectName from "./FormUpdateProjectName";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function SectionHeaderLeft(props) {
  const { headerTitle, toggleConfirmDelete } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [header, setHeader] = useState(headerTitle);

  const leftHeader = css`
    display: flex;
    gap: 0.5em;
    align-items: center;
  `;

  const editButton = css`
    &:hover {
      cursor: pointer;
    }
  `;

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div css={leftHeader}>
      {showEdit ? (
        <FormUpdateProjectName
          toggleForm={toggleEdit}
          initialValue={header}
          updateHeader={setHeader}
        />
      ) : (
        <>
          {header}
          <EditIcon fontSize="small" css={editButton} onClick={toggleEdit} />
          <DeleteForeverIcon fontSize="small" onClick={toggleConfirmDelete} />
        </>
      )}
    </div>
  );
}
