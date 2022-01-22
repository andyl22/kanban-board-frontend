/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import FormEditSectionItem from "./FormEditSectionItem";

export default function ModalEditSectionItem(props) {
  const { item, toggleModal } = props;

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
      <ModalHeader title="Edit Item" toggleModal={toggleModal} />
      <div css={modalContentContainer}>
        <FormEditSectionItem item={item} toggleModal={toggleModal} />
      </div>
    </Modal>
  );
}
