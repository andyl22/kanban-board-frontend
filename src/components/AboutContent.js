/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";

export default function AboutContent() {
  const contentContainer = css`
    width: 100%;
    height: 100%;
    padding: 2em;
    ul {
      padding: 0.5em 2em;
    }
  `;
  return (
    <div css={contentContainer}>
      <p>
        This is a practice project created via the MERN stack. <br />
        Only an username and password is required for registration.
        <br /> <br />
        Basic functionality includes simple drag and drop of Items, and CRUD
        functionality for:
        <ul>
          <li>Projects</li>
          <li>Sections</li>
          <li>Section Items</li>
        </ul>
        <br />
        Includes a dark mode toggle in the user settings which persists between
        sessions and refreshes. <br />
        <br />
        <b>Cookies are used by this application!</b> <br /> Usage includes
        storing user info, themes, and auth.
      </p>
    </div>
  );
}
