/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export default function IconAdd() {
  const { colors } = useContext(ThemeContext);
  const button = css`
    color: ${colors.button};
    background: white;
    border-radius: 2em;
    &:hover {
      color: ${colors.buttonHover}};
      cursor: pointer;
    }
  `;

  return (
    <AddCircleIcon css={button}/>
  )
}
