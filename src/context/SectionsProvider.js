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

    const getIndexOfItemList = () => {
      return getIndexOfObj(sections.itemsList, "sectionID", "sectionID");
    };

    const getIndexOfSectionList = () => {
      return getIndexOfObj(sections.sectionDetails, "_id", "id");
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
          itemsList: [...sections.itemsList, {sectionID: action.sectionID, items: []}]
        };
      case "EDITSECTION":
        return (() => {
          const copyOfSections = createDeepCopy(sections.sectionDetails);
          const indexOfSection = getIndexOfSectionList();

          copyOfSections[indexOfSection] = action.updatedSection;

          return {
            ...sections,
            sectionDetails: copyOfSections,
          };
        })();
      case "DELETESECTION":
        return {
          ...sections,
          sectionDetails: sections.sectionDetails.filter(
            (section) => section._id !== action.sectionID
          ),
        };
      case "CLEARSECTIONS":
        return null;
      case "SETITEMS":
        // dispatch({type:'SETITEMS', sectionItems: res.sections})
        return { ...sections, itemsList: action.sectionItems };
      case "ADDITEM":
        // dispatch({type:'ADDITEM', item: item})
        return (() => {
          const itemListIndex = getIndexOfItemList();

          const copyOfItems = createDeepCopy(sections.itemsList);
          copyOfItems[itemListIndex].items.push(action.item);
          return { ...sections, itemsList: copyOfItems };
        })();
      case "EDITITEM":
        return (() => {
          const itemListIndex = getIndexOfItemList();
          const copyOfItems = createDeepCopy(sections.itemsList);

          const itemIndex = getIndexOfObj(
            copyOfItems[itemListIndex].items,
            "_id",
            "itemID"
          );
          copyOfItems[itemListIndex].items[itemIndex] = action.updatedItem;
          return { ...sections, itemsList: copyOfItems };
        })();
      case "DELETEITEM":
        return (() => {
          const itemListIndex = getIndexOfItemList();
          const copyOfItems = createDeepCopy(sections.itemsList);

          copyOfItems[itemListIndex].items = sections.itemsList[
            itemListIndex
          ].items.filter((item) => item._id !== action.itemID);

          return { ...sections, itemsList: copyOfItems };
        })();
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
