/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import Modal from "./Modal";
import { UserContext } from "../context/UserProvider";
import { useContext, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Cookie from "js-cookie";

export default function LoginModal(props) {
  const { setCurrentUser } = useContext(UserContext);
  const { toggleModal } = props;
  const [ formState, setFormState ] = useState({username: "", password: ""});
  const [ error, setError ] = useState(false);

  const rolloutAnimation = keyframes`
  0% {
    transform: translateY(-100px)
  }
  100% {
    transform: translateY(0px)
  `;

  const modalContent = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
    margin: 0 auto;
    max-width: 90%;
    min-width: 250px;
    text-align: center;
    background: white;
    overflow: hidden;
    animation: ${rolloutAnimation} 1s ease;
  `

  const header = css`
    flex: 0;
    display: flex;
    justify-content: space-between;
    background: #5C81FF;
    width: 100%;
    padding: 0.5em 0.5em;
    h1 {
      margin: 0 auto;
      color: white;
    }
  `;

  const button = css`
    color: white;
    &:hover {
      color: white;
      cursor: pointer;
    }
  `;

  const formContainer = css`
    padding: 1em;
    p {
      color: red !important;
      font-size: .7em;
      margin-bottom: 1em;
    }
  `

  const form = css`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-size: 0.8em;
    input {
      border-radius: 0.3em;
      padding: 0.2em 0.5em 0.4em 0.5em;
      border: 1px solid #e4e4e4;
    }
    input[type="text"],
    input[type="password"] {
      &:focus {
        border: 1px solid white;
        outline: 2px solid #2684ff;
        &::placeholder {
          font-size: 0.8em;
        }
      }
    }
    input[type="submit"] {
      width: 75%;
      &:hover {
        cursor: pointer;
        background: #E2E2E2;
      }
    }
  `;

  const handleClose = (e) => {
    toggleModal();
  };

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
      setError("Could not authenticate.")
    } else if(authUserResponse.status === 200) {
      setCurrentUser({username: formState.username});
      Cookie.set('user', JSON.stringify({username: formState.username}));
      toggleModal();
    } else if (authUserResponse) {
      console.log(authUserResponse)
      const authResponseMessage = await authUserResponse.json();
      setError(authResponseMessage);
    }
  };

  const handleChange = (e) => {
    setFormState({...formState, [e.target.id]: e.target.value});
  }

  return (
    <Modal>
      <div id="modal-content" css={modalContent}>
        <div css={header}>
          <h1>Log In</h1>
          <CancelIcon css={button} onClick={handleClose} />
        </div>
        <div css={formContainer}>
          {(error) ? <p>{error.message || "Could not authenticate"}</p> : null}
          <form css={form} onSubmit={handleSubmit}>
            <input type="text" id="username" placeholder="Username" onChange={handleChange} value={formState.username}/>
            <input type="password" id="password" placeholder="Password" onChange={handleChange} value={formState.password}/>
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </Modal>
  );
}
