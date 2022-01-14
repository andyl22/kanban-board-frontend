/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import ButtonAdd from "./ButtonAdd";
import FormCreateSectionItem from "./FormCreateSectionItem";

export default function AddSectionController(props) {
  const { addSectionItem, sectionID } = props;
  const [showForm, setShowForm] = useState(false);

  const addSectionItemButtonContainer = css`
  background: none;
  padding: 1em;
`;

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return showForm ? (
    <FormCreateSectionItem
      toggleForm={toggleForm}
      addSectionItem={addSectionItem}
      sectionID={sectionID}
    />
  ) : (
    <div css={addSectionItemButtonContainer}>
      <ButtonAdd onClickAction={toggleForm} />
    </div>
  );
}
