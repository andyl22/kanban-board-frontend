/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";
import ModalEditItem from "./ModalEditItem";

export default function EditSectionItemController(props) {
  const { item, toggleModal } = props;
  const { sections, dispatch } = useContext(SectionsContext);

  const deleteProject = () => {
    postHTTP("/sectionItem/editSectionItem", { itemID: item._id })
      .then((res) => console.log(res))
      .then(
        dispatch({
          type: "EDITITEM",
          itemID: item._id,
          sectionID: item.sectionID,
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <ModalEditItem
      deleteObject={deleteProject}
      itemName={item.name}
      toggleModal={toggleModal}
    />
  );
}
