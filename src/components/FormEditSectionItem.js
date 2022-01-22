/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import { postHTTP } from "../utilities/fetchAPIs";
import Form from "./Form";

export default function FormEditSectionItem(props) {
  const { item, toggleModal } = props;
  const [formState, setFormState] = useState({});
  const [updateError, setUpdateError] = useState(false);
  const inputRef = useRef();

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
  `

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
    console.log(formState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postHTTP("/sectionItem/editSectionItem", {
      itemID: item._id,
      updateBody: formState,
    }).then((res) => {
      if (res.success) {
        // dispatch function here
        toggleModal();
      } else {
        setUpdateError(res.message);
      }
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form handleSubmit={handleSubmit}>
      <div css={inputWrapper}>
        <label htmlFor="itemName">Name</label>
        <input
          type="text"
          placeholder="Item Name"
          value={formState.itemName || item.name}
          id="itemName"
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
      <div css={inputWrapper}>
        {" "}
        <label htmlFor="itemDescription">Description</label>
        <input
          type="text"
          placeholder="Item Description"
          value={formState.itemDescription || item.description}
          id="itemDescription"
          onChange={handleChange}
        />
      </div>

      <div css={deleteConfirmButtonContainer}>
        <input type="submit" value="Confirm" />
        <input type="button" value="Cancel" onClick={toggleModal}></input>
      </div>
    </Form>
  );
}
