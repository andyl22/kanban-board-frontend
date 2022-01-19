/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export default function SectionHeader(props) {
  const { headerTitle } = props;
  const { colors } = useContext(ThemeContext);
  const sectionHeader = css`
    width: 100%;
    flex: 1;
    padding: .5em 2em;
    background: ${colors.headerColor};
    box-shadow: 0px 0px 10px ${colors.headerShadowColor};
    color: white;
    font-weight: 600;
    position: sticky;
    top: 0;
    left: 0;
  `

  return (
    <div css={sectionHeader || "Loading"}>
      {headerTitle}
    </div>
  )
}