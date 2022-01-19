import React, { useReducer } from "react";

const SectionsContext = React.createContext([{}, () => {}]);

const SectionsProvider = ({ children }) => {
  const reducer = (sections, action) => {
    switch (action.type) {
      case "SETSECTIONS":
        // dispatch({type:'SETSECTIONS', sectionDetails: res.sections}
        return {...sections, sectionDetails: action.sectionDetails}
      case "ADDSECTIONS":
        return {...sections, sectionDetails: [...sections.sectionDetails, action.sectionDetail] };
      case "SETITEMS":
        // dispatch({type:'SETITEMS', sectionItems: res.sections})
        return {...sections, items: action.sectionItems}
      case "ADDITEMS":
        return {...sections, items: [...sections.items, action.item] };
      default:
        return;
    }
  };

  const [sections, dispatch] = useReducer(reducer, null);

  return (
    <SectionsContext.Provider value={{ sections, dispatch }}>
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsProvider, SectionsContext };
