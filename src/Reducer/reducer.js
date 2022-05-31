export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newItems = [...state.items, action.payload];
    return {
      ...state,
      items: newItems,
      isModalOpen: true,
      modalContent: "item added",
    };
  }
  if (action.type === "NO_VALUE") {
    return { ...state, isModalOpen: true, modalContent: "please enter value" };
  }
  if (action.type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }
  if (action.type === "REMOVE_ITEM") {
    const newItems = state.items.filter((item) => item.id !== action.payload);
    return { ...state, items: newItems };
  }
  if (action.type === "IS_CHECKED") {
    const newItems = state.items.map((item) => {
      if (item.id === action.payload) {
        const newItem = { ...item, isChecked: !item.isChecked };
        return newItem;
      }
      return item;
    });
    return { ...state, items: newItems };
  }
  throw new Error("no matching action type");
};
