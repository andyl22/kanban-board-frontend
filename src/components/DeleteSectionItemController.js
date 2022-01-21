/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

export default function DeleteSectionItemController(props) {
  const { itemName, toggleModal } = props;
  const { sections, dispatch } = useContext(SectionsContext);

  const deleteProject = () => {
    // implement post request to delete from backend and update the items list
  };

  return (
    <ModalDeleteConfirm
      deleteObject={deleteProject}
      itemName={itemName}
      toggleModal={toggleModal}
    />
  );
}
