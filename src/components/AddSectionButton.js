/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import FormCreateSection from "../components/FormCreateSection";

export default function AddSectionButton() {
  const [showCreateSection, setShowCreateSection] = useState(false);

  const addButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    background: white;
    border-radius: 1em;
    gap: .2em;
    padding: .3em .5em .4em .8em;
    border: 2px solid gray;
    background: white;
    color: black;
    &:hover {
      border: 2px solid #a6a6a6;
      cursor: pointer;
      background: #f5f5f5;
      transform: scale(1.01);
    }
    p {
      color: inherit;
      font-weight: 600;
    }
  `;

  const toggleForm = () => {
    setShowCreateSection(!showCreateSection);
  };

  return showCreateSection ? (
    <FormCreateSection toggleForm={toggleForm} />
  ) : (
    <button onClick={toggleForm} css={addButton}>
      <p>Add New Section</p>
      <AddIcon />
    </button>
  );
}
