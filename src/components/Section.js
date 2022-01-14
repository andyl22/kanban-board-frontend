/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useState, useEffect } from "react";
import SectionItem from "./SectionItem";
import AddSectionItemController from "./AddSectionItemController";
import { postHTTP } from "../utilities/fetchAPIs";

export default function Section(props) {
  const { name, id, color } = props;
  const [sectionItems, setSectionItems] = useState([]);
  const breakpoints = [475, 720];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const rolloutY = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
    transform-origin: left;
  }
  100% {
    transform: translateY(0px);
  }
`;

  const section = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: fit-content;
    text-align: center;
    border-radius: 1em;
    background: white;
    animation: ${rolloutY} 0.4s ease-in;
    &:-moz-drag-over {
      outline: 1px solid black;
    }
    h1 {
      width: 100%;
      padding: 0.5em;
      background: ${color || "white"};
      border-bottom: 2px solid black;
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
      color: black !important;
    }
  `;

  const sectionItemsContainer = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 280px;
    min-width: 200px;
    ${mq[1]} {
      width: 100%;
      padding: 0.8em 0.4em;
      gap: 0.4em;
    }
    height: fit-content;
    padding: 1em 1em;
    flex-wrap: wrap;
    gap: 15px;
  `;

  const addSectionItem = (sectionItem) => {
    setSectionItems([...sectionItems, sectionItem]);
  };

  useEffect(() => {
    postHTTP("/sectionItem/sectionItemsBySectionID", { sectionID: id })
      .then((res) => setSectionItems(res.sections))
      .catch((err) => console.log(err));
  }, [id]);

  const mappedSectionItems = sectionItems.map((item) => (
    <SectionItem
      name={item.name}
      description={item.description}
      dateOfCreation={item.date_of_creation}
      id={item._id}
      key={item._id}
    />
  ));

  return (
    <section id={id} css={section}>
      <h1>{name}</h1>
      <div css={sectionItemsContainer}>
        {mappedSectionItems}
        <AddSectionItemController addSectionItem={addSectionItem} />
      </div>
    </section>
  );
}
