/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";

export default function ModalEditItem(props) {
  const { type, toggleModal, children } = props;

  const modalContentContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    p {
      word-break: break-word;
    }
  `;

  return (
    <Modal toggleModal={toggleModal}>
      <ModalHeader title={`Edit ${type}`} toggleModal={toggleModal} />
      <div css={modalContentContainer}>
        {children}
      </div>
    </Modal>
  );
}
