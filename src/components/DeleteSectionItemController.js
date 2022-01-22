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

  const deleteSectionItem = () => {
    postHTTP("/sectionItem/deleteSectionItem", { itemID: item._id })
      .then((res) => console.log(res))
      .then(
        dispatch({
          type: "DELETEITEM",
          itemID: item._id,
          sectionID: item.sectionID,
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <ModalDeleteConfirm
      deleteObject={deleteSectionItem}
      itemName={item.name}
      toggleModal={toggleModal}
    />
  );
}
