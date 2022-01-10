/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Cookie from "js-cookie";
import { UserContext } from "../context/UserProvider";
import { useContext, useState } from "react";
import Form from "./Form";

export default function FormLogin(props) {
  const { toggleModal } = props;
  const { setCurrentUser } = useContext(UserContext);
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);

  const formError = css`
    word-wrap: break-word;
    color: red !important;
    font-size: 0.7em;
    margin-bottom: 1em;
    max-width: 250px;
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const authUserResponse = await fetch("/auth/login", options);
    if (authUserResponse.status === 500) {
      setError("Could not authenticate.");
    } else if (authUserResponse.status === 200) {
      setCurrentUser({ username: formState.username });
      Cookie.set("user", JSON.stringify({ username: formState.username }));
      toggleModal();
    } else if (authUserResponse) {
      const authResponseMessage = await authUserResponse.json();
      setError(authResponseMessage);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  return (
    <Form handleSubmit={handleSubmit}>
      {error ? (
        <p css={formError}>{error.message || "Could not authenticate"}</p>
      ) : null}
      <input
        type="text"
        id="username"
        placeholder="Username"
        onChange={handleChange}
        value={formState.username}
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        onChange={handleChange}
        value={formState.password}
      />
      <input type="submit" value="Login" />
    </Form>
  );
}
