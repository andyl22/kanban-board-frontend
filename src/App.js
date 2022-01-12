/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Router from "./Router";
import { useContext } from 'react';
import { ThemeContext } from "./context/ThemeProvider";

function App() {
  const {colors} = useContext(ThemeContext);

  const app = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: ${colors.contentBackground};
    h1, h2, h3, h4, h5 {
      color: ${colors.headingColor};
    },
    p {
      color: ${colors.basicFontColor};
    },
    a {
      color: ${colors.linkFontColor};
      &:hover {
        color: ${colors.linkHoverColor};
      }
    }
  `;

  return (
    <div css={app}>
      <Router />
    </div>
  );
}

export default App;
