/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Cookie from "js-cookie";
import { UserContext } from "../context/UserProvider";
import { useContext, useState } from "react";
import Form from "./Form";
import { postAPI } from "../utilities/fetchAPIs";

export default function FormLogin(props) {
  const { toggleModal } = props;
  const { setCurrentUser } = useContext(UserContext);
  const [formState, setFormState] = useState({});
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

    if (formState.password !== formState.verifyPassword) {
      setError({ message: "Passwords do not match!" });
      return;
    }

    const createUserResponse = await postAPI('/users/registerUser', 'POST', formState);
    if (createUserResponse.status>=500) {
      setError({ message: "Could not contact the server."});
    } else if (createUserResponse.status===400) {
      const errorMessage = await createUserResponse.json();
      setError(errorMessage);
    } else if (createUserResponse.status===200) {
      postAPI('/auth/login', 'POST', formState)
        .then(res => res.json())
        .then(res => console.log(res))
        .then(setCurrentUser({ username: formState.username} ))
        .then(Cookie.set("user", JSON.stringify({ username: formState.username })))
        .then(toggleModal())
        .catch(setError("Could not log in"));
      ;
    } else {
      setError({ message: "Something went wrong! Could not authenticate." });
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  return (
    <Form handleSubmit={handleSubmit}>
      {error ? <p css={formError}>{error.message}</p> : null}
      <input
        type="text"
        id="username"
        placeholder="Username"
        onChange={handleChange}
        value={formState.username || null}
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        onChange={handleChange}
        value={formState.password || null}
      />
      <input
        type="password"
        id="verifyPassword"
        placeholder="Verify Password"
        onChange={handleChange}
        value={formState.verifyPassword || null}
      />
      <input type="submit" value="Login" />
    </Form>
  );
}
