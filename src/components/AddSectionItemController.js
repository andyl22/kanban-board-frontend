/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from 'react';
import ButtonAdd from "./ButtonAdd";
import FormCreateSectionItem from "./FormCreateSectionItem";

export default function AddSectionController() {
  const [ showForm, setShowForm ] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return showForm ? (
    <FormCreateSectionItem toggleForm={toggleForm} />
  ) : (
    <ButtonAdd onClickAction={toggleForm} />
  );
}
