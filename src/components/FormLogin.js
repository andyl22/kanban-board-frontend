/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";
import Cookie from "js-cookie";
import { UserContext } from "../context/UserProvider";
import { useContext, useState } from "react";
import Form from "./Form";
import { postHTTP } from "../utilities/fetchAPIs";

export default function FormLogin(props) {
  const { toggleModal } = props;
  const { setCurrentUser } = useContext(UserContext);
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    postHTTP("/auth/login", formState)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setCurrentUser({ username: formState.username });
          Cookie.set("user", JSON.stringify({ username: formState.username }));
          toggleModal();
        }
      })
      .catch((err) => setError("Authentication Server is not available"));
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  return (
    <Form handleSubmit={handleSubmit}>
      {error ? <p>{error}</p> : null}
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
