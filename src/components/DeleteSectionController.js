/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

export default function DeleteSectionController(props) {
  const { section, toggleModal } = props;
  const { dispatch } = useContext(SectionsContext);

  const deleteSection = () => {
    dispatch({type: "DELETESECTION", sectionID: section._id})
    postHTTP('/projectSection/deleteSectionById', {id: section._id})
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
