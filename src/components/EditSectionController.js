/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import ModalEditItem from "./ModalEditItem";
import FormEditSection from "./FormEditSection";

export default function EditSectionController(props) {
  const {section, toggleModal} = props;

  return (
    <ModalEditItem type={"Section"} toggleModal={toggleModal}>
      <FormEditSection section={section} toggleForm={toggleModal}/>
    </ModalEditItem>
  )
}