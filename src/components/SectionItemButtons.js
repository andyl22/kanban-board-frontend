/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function SectionItemButton(props) {
  const { toggleEditModal, toggleDeleteModal, toggleButtons } = props;

  const showEditModal = () => {
    toggleButtons();
    toggleEditModal();
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
      <div css={manipulateItemButtons}>
        <button css={button} onClick={showEditModal}>
          <EditIcon fontSize="small" />
        </button>
        <button css={button} onClick={showDeleteModal}>
          <DeleteForeverIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
