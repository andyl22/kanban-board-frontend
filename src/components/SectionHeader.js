/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteSectionController from "./DeleteSectionController";
import EditSectionController from "./EditSectionController";

export default function SectionHeader(props) {
  const { section } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const sectionHeader = css`
    display: flex;
    position: relative;
    justify-content: space-between;
    width: 100%;
    padding: 1em;
    background: ${section.color || "#FFFFFF"};
    border-bottom: 2px solid #727272;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    word-break: break-word;
  `;

  const text = css`
    margin: 0 auto;
    padding: 0 2.5em;
    color: black !important;
  `;

  const buttonsContainer = css`
    position: absolute;
    transform: scale(0.8);
    right: 0.5em;
  `;

  const buttons = css`
    color: black;
    &:hover {
      cursor: pointer;
      color: gray;
    }
  `;

  const toggleDelete = () => {
    setShowDelete(!showDelete);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <>
      <div css={sectionHeader}>
        <h1 css={text}>{section.name}</h1>
        <div css={buttonsContainer}>
          <EditIcon fontSize="small" css={buttons} onClick={toggleEdit} />
          <DeleteForeverIcon
            fontSize="small"
            css={buttons}
            onClick={toggleDelete}
          />
        </div>
      </div>
      {showDelete ? (
        <DeleteSectionController section={section} toggleModal={toggleDelete} />
      ) : null}
      {showEdit ? (
        <EditSectionController section={section} toggleModal={toggleEdit} />
      ) : null}
    </>
  );
}
