/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { postHTTP } from "../utilities/fetchAPIs";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";

export default function ModalDeleteConfirm(props) {
  const { itemName, toggleModal } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteConfirmButtonContainer = css`
    display: flex;
    gap: 1em;
    padding: 1em;
    button {
      border: 1px solid #cdcdcd;
      border-radius: 1em;
      padding: .2em 1em;
      font-weight: 600;
      &:hover {
        cursor: pointer;
        background: #d9d9d9;
      }
    }
  `;

  const deleteProject = () => {
    console.log(id)
    postHTTP('/projects/deleteProject', {id: id})
    .then(res => console.log(res))
    .then(navigate('/kanban-board'))
    .catch(err => console.log(err))
  }

  return (
    <Modal>
      <ModalHeader
        title={`Are you sure you want to delete ${itemName}`}
        toggleModal={toggleModal}
      />
      <div css={deleteConfirmButtonContainer}>
        <button onClick={deleteProject}>Confirm</button>
        <button onClick={toggleModal}>Cancel</button>
      </div>
    </Modal>
  );
}
