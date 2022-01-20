/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import FormUpdateProjectName from "./FormUpdateProjectName";
import React, { useState, useContext } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ThemeContext } from "../context/ThemeProvider";

export default function SectionHeaderLeft(props) {
  const { headerTitle, toggleConfirmDelete } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [header, setHeader] = useState(headerTitle);
  const { colors } = useContext(ThemeContext);

  const leftHeader = css`
    display: flex;
    gap: 0.5em;
    align-items: center;
  `;

  const button = css`
    color: ${colors.iconColor};
    &:hover {
      cursor: pointer;
      color: ${colors.iconHoverColor};
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
          <EditIcon fontSize="small" css={button} onClick={toggleEdit} />
          <DeleteForeverIcon fontSize="small" css={button} onClick={toggleConfirmDelete} />
        </>
      )}
    </div>
  );
}
