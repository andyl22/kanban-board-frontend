/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState, useRef, useEffect, useContext } from "react";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";

import Form from "./Form";

export default function FormEditSectionItem(props) {
  const { item, toggleForm } = props;
  const [formState, setFormState] = useState(item);
  const [updateError, setUpdateError] = useState(false);
  const inputRef = useRef();
  const { dispatch } = useContext(SectionsContext);

  const deleteConfirmButtonContainer = css`
    display: flex;
    gap: 1em;
    padding: 1em 0 0 0;
    button {
      border: 1px solid #cdcdcd;
      border-radius: 1em;
      padding: 0.2em 1em;
      font-weight: 600;
      &:hover {
        cursor: pointer;
        background: #d9d9d9;
      }
    }
  `;

  const inputWrapper = css`
    display: flex;
    justify-content: flex-end;
    gap: 1em;
    align-items: center;
  `;

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postHTTP("/sectionItem/editSectionItem", {
      itemID: item._id,
      updateBody: formState,
    })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: "EDITITEM",
            sectionID: item.sectionID,
            itemID: item._id,
            updatedItem: formState,
          });
          toggleForm();
        } else {
          setUpdateError(res.message);
        }
      })
      .catch((err) =>
        setUpdateError(`Could not update because server is unavailable.`)
      );
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form handleSubmit={handleSubmit}>
      {updateError ? <p>{updateError}</p> : null}
      <div css={inputWrapper}>
        <label htmlFor="itemName">Name</label>
        <input
          type="text"
          placeholder="Item Name"
          value={formState.name || item.name}
          id="name"
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
      <div css={inputWrapper}>
        <label htmlFor="itemDescription">Description</label>
        <input
          type="text"
          placeholder="Item Description"
          value={formState.description || item.description}
          id="description"
          onChange={handleChange}
        />
      </div>
      <div css={deleteConfirmButtonContainer}>
        <input type="submit" value="Confirm" />
        <input type="button" value="Cancel" onClick={toggleForm}></input>
      </div>
    </Form>
  );
}
