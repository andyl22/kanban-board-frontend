/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";
import ModalEditSectionItem from "./ModalEditSectionItem";

export default function EditSectionItemController(props) {
  const { item, toggleModal } = props;
  const { sections, dispatch } = useContext(SectionsContext);

  const editProject = (e) => {
  };

  return (
    <ModalEditSectionItem
      deleteObject={editProject}
      item = {item}
      toggleModal={toggleModal}
    />
  );
}
