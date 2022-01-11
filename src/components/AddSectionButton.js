/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export default function AddSectionButton() {
  const { colors } = useContext(ThemeContext);
  const [showNameInput, setShowNameInput] = useState(false);
  const inputRef = useRef(null);

  const addButton = css`
    height: fit-content;
    min-width: 160px;
    border-radius: 1em;
    background: white;
    padding: .5em 1em;
    font-size: .9em;
    text-align: center;
    border: 2px solid gray;
    &:hover {
      border: 2px solid #a6a6a6;
      cursor: pointer;
      background: #F5F5F5;
      transform: scale(1.01);
    }
    p {
      color: black !important;
    }
  `;

  const input = css`
    display: flex;
    padding: .3em .7em;
    font-size: .8em;
    height: fit-content;
    border-radius: 1em;
    border: 1px solid gray;
    &:focus {
      outline: none;
      border: 3px solid ${colors.borderColor};
    }
  `

  const showModal = () => {
    setShowNameInput(true);
  };

  const handleSubmit = (e) => {
    console.log(e);
  }

  useEffect(() => {
    if(showNameInput) inputRef.current.focus();
  }, [showNameInput]);

  if(showNameInput) {
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Name" css={input} ref={inputRef}/>
      </form>
    )
  }
  return (
    <button css={addButton} onClick={showModal}>
      <p>Add New Section</p>
      <AddIcon />
    </button>
  );
}
