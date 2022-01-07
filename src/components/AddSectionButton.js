/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import AddIcon from '@mui/icons-material/Add';

export default function AddSectionButton() {

  const addButton = css`
    height: fit-content;
    min-width: 160px;
    padding: .5em;
    border-radius: 1em;
    background: white;
    text-align: center;
    border: 2px solid gray;
    &:hover {
      border: 2px solid #A6A6A6;
      cursor: pointer;
      transform: scale(1.01);
    }
    p {
      color: black !important;
    }
  `

  const handleClick = () => {
    alert("Added new stack")
    //make API call to insert a new section
  }

  return (
    <button css={addButton} onClick={handleClick}>
      <p>Add New Section</p>
      <AddIcon />
    </button>
  )
}