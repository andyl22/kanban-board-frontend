/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import Form from "./Form";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";

export default function FormEditSection(props) {
  const { section, toggleForm } = props;
  const { dispatch } = useContext(SectionsContext);
  const [formState, setFormState] = useState( section );
  const [updateError, setUpdateError] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postHTTP("/projectSection/editSectionByID", {
      id: section._id,
      updateBody: formState,
    })
      .then(
        dispatch({
          type: "EDITSECTION",
          updatedSection: formState,
          id: section._id,
        })
      )
      .then(toggleForm())
      .catch((err) => setUpdateError("Could not update the section details."));
  };

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      toggleForm();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Form handleSubmit={handleSubmit}>
      {updateError ? <p>{updateError}</p> : null}
      <input
        type="text"
        placeholder="Section Name"
        id="name"
        value={formState.name || section.name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <label htmlFor="color">Pick a section color:</label>
      <input
        type="color"
        id="color"
        value={formState.color || section.color || "#FFFFFF"}
        onChange={handleChange}
      />
      <input type="submit" value="Submit" onChange={handleChange} />
    </Form>
  );
}
