/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form";
import CancelIcon from "@mui/icons-material/Cancel";
import { ThemeContext } from "../context/ThemeProvider";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";

export default function FormCreateSectionItem(props) {
  const { dispatch } = useContext(SectionsContext);
  const { toggleForm, sectionID } = props;
  const { id } = useParams();
  const [formState, setFormState] = useState({
    projectID: id,
    sectionID: sectionID,
  });
  const inputRef = useRef();
  const { colors, mq } = useContext(ThemeContext);

  const container = css`
    display: flex;
    padding: 0.5em 1em;
    gap: 0.5em;
    border-radius: 0.5em;
    align-items: center;
    height: fit-content;
    width: fit-content;
    background: #f2f2f2;
    margin: 1em 0 2em 0;
    ${mq[1]} {
      width: 95%;
    }
  `;

  const closeButton = css`
    &:hover {
      cursor: pointer;
      color: ${colors.iconHoverColor};
    }
  `;

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formState.dateOfCreation = new Date().toISOString();
    postHTTP("/sectionItem/createSectionItem", formState)
      .then((res) =>
        dispatch({
          type: "ADDITEM",
          item: res.sectionItem,
          sectionID: sectionID,
        })
      )
      .then(toggleForm())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div css={container}>
      <Form handleSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={formState.itemName || ""}
          id="itemName"
          onChange={handleChange}
          ref={inputRef}
        />
        <input
          type="text"
          placeholder="Item Description"
          value={formState.itemDescription || ""}
          id="itemDescription"
          onChange={handleChange}
        />
        <input type="submit"/>
      </Form>
      <CancelIcon fontSize="small" css={closeButton} onClick={toggleForm} />
    </div>
  );
}
