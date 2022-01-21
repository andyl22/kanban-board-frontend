/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

export default function DeleteSectionItemController(props) {
  const { item, toggleModal } = props;
  const { sections, dispatch } = useContext(SectionsContext);

  const deleteProject = () => {
    dispatch({type: 'DELETEITEM', itemID: item._id, sectionID: item.sectionID})
  };

  return (
    <ModalDeleteConfirm
      deleteObject={deleteProject}
      itemName={item.name}
      toggleModal={toggleModal}
    />
  );
}
