import React, { useReducer } from "react";

const SectionsContext = React.createContext([{}, () => {}]);

const SectionsProvider = ({ children }) => {
  const reducer = (sections, action) => {
    const createDeepCopy = (obj) => {
      return JSON.parse(JSON.stringify(obj));
    };

    // Provide a list to filter,
    // the field  of the objects in the list to use for lookup,
    // and the actions look up parameter
    const getIndexOfObj = (obj, objParam, lookupParam) => {
      return obj.indexOf(
        obj.filter((item) => item[objParam] === action[lookupParam])[0]
      );
    };

    switch (action.type) {
      case "SETSECTIONS":
        // dispatch({type:'SETSECTIONS', sectionDetails: res.sections}
        return { ...sections, sectionDetails: action.sectionDetails };
      case "ADDSECTION":
        // dispatch({type:'ADDSECTION', sectionDetail: section})
        return {
          ...sections,
          sectionDetails: [...sections.sectionDetails, action.sectionDetail],
        };
      case "EDITSECTIONS":
        return;
      case "DELETESECTION":
        return;
      case "CLEARSECTIONS":
        return null;
      case "SETITEMS":
        // dispatch({type:'SETITEMS', sectionItems: res.sections})
        return { ...sections, itemsList: action.sectionItems };
      case "ADDITEM":
        // dispatch({type:'ADDITEM', item: item})
        return (() => {
          const indexOfItems = getIndexOfObj(
            sections.itemsList,
            "sectionID",
            "sectionID"
          );

          // Create an item in the itemsList if it does not exist
          if (indexOfItems === -1) {
            return {
              ...sections,
              itemsList: [
                ...sections.itemsList,
                { sectionID: action.sectionID, items: [action.item] },
              ],
            };
          }

          const copyOfItems = createDeepCopy(sections.itemsList);
          copyOfItems[indexOfItems].items.push(action.item);
          return { ...sections, itemsList: copyOfItems };
        })();
      case "EDITITEM":
        return;
      case "DELETEITEM":
        const indexOfItems = getIndexOfObj(
          sections.itemsList,
          "sectionID",
          "sectionID"
        );

        const copyOfItems = createDeepCopy(sections.itemsList);
        copyOfItems[indexOfItems].items = sections.itemsList[
          indexOfItems
        ].items.filter((item) => item._id !== action.itemID);

        return { ...sections, itemsList: copyOfItems };
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
