/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

export default function DeleteSectionController(props) {
  const { section, toggleModal } = props;
  const { sections, dispatch } = useContext(SectionsContext);

  const deleteSection = () => {
    postHTTP('/sectionItem/deleteSectionItem', {sectionID: section._id})
      .then((res) => console.log(res))
      .then(
        dispatch({
          type: "DELETESECTION",
          sectionID: section._id,
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <ModalDeleteConfirm
      deleteObject={deleteSection}
      sectionName={section.name}
      toggleModal={toggleModal}
    />
  );
}
