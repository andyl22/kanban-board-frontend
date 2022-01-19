/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import ButtonAdd from "./ButtonAdd";
import FormCreateSection from "./FormCreateSection";

export default function AddSectionController(props) {
  const [showForm, setShowForm] = useState(false);

  const addSectionButton = css`
    background: none;
    padding: 1.5em;
    margin-bottom: 1em;
  `;

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return showForm ? (
    <FormCreateSection toggleForm={toggleForm} />
  ) : (
    <div css={addSectionButton}>
      <ButtonAdd onClickAction={toggleForm} />
    </div>
  );
}
