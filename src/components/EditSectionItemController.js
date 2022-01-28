/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import ModalEditItem from "./ModalEditItem";
import FormEditSectionItem from "./FormEditSectionItem";

export default function EditSectionItemController(props) {
  const { item, toggleModal } = props;

  return (
    <ModalEditItem type="Item" toggleModal={toggleModal}>
      <FormEditSectionItem item={item} toggleForm={toggleModal} />
    </ModalEditItem>
  );
}
