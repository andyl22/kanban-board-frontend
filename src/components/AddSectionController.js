/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import ButtonAdd from "./ButtonAdd";
import FormCreateSection from "./FormCreateSection";

export default function AddSectionController(props) {
  const [showForm, setShowForm] = useState(false);
  const { addSection } = props;

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return showForm ? (
    <FormCreateSection toggleForm={toggleForm} addSection={addSection} />
  ) : (
    <ButtonAdd onClickAction={toggleForm} />
  );
}
