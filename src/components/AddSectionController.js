/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import ButtonAdd from "./ButtonAdd";
import FormCreateSection from "./FormCreateSection";

export default function AddSectionController() {
  const [showForm, setShowForm] = useState(false);
  const { mq } = useContext(ThemeContext);

  const addSectionButton = css`
    background: none;
    padding: 1.5em;
    margin-bottom: 1em;
    ${mq[1]} {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  `;

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return showForm ? (
    <FormCreateSection toggleForm={toggleForm} />
  ) : (
    <div css={addSectionButton}>
      <ButtonAdd onClickAction={toggleForm} css/>
    </div>
  );
}
