/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import Form from "./Form";
import ThemeButton from "./ThemeButton";

export default function FormSettings() {
  const [formState, setFormState] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <ThemeButton handleChange={handleChange} />
    </Form>
  );
}
