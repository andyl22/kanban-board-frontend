/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";

export default function Form(props) {
  const { handleSubmit, children } = props;

  const formContainer = css`
    display: flex;
    padding: .5em 0;
  `;

  const form = css`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-size: 0.8em;
    input {
      border-radius: 0.3em;
      padding: 0.2em 0.5em 0.4em 0.5em;
      border: 1px solid #e4e4e4;
      max-width: 180px;
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
      max-width: 180px;
      padding: 0.3em 3em;
      &:hover {
        cursor: pointer;
        background: #e2e2e2;
      }
    }
  `;

  return (
    <div css={formContainer}>
      <form css={form} onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
  );
}
