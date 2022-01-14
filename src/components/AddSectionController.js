/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import ButtonAdd from "./ButtonAdd";
import FormCreateSection from "./FormCreateSection";

export default function AddSectionController(props) {
  const [showForm, setShowForm] = useState(false);
  const { addSection } = props;

  const addSectionButton = css`
    background: none;
    padding: 1.5em;
  `;

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return showForm ? (
    <FormCreateSection toggleForm={toggleForm} addSection={addSection} />
  ) : (
    <div css={addSectionButton}>
      <ButtonAdd onClickAction={toggleForm} />
    </div>
  );
}
