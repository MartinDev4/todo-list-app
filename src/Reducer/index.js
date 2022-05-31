import React, { useState, useReducer } from "react";
import Modal from "../Modal/Modal";
// reducer function
import { reducer } from "./reducer";

const defaultState = {
  items: [],
  isModalOpen: false,
  modalContent: "",
};
const Index = () => {
  const [item, setItem] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) {
      const newItem = {
        id: new Date().getTime().toString(),
        item,
        isChecked: false,
      };
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setItem("");
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>To-do list app</h2>
      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      {state.items.map((item) => {
        return (
          <div key={item.id} className="item">
            <input
              onClick={() => dispatch({ type: "IS_CHECKED", payload: item.id })}
              type="checkbox"
              id="check"
            />
            {item.isChecked ? (
              <h4 style={{ textDecoration: "line-through" }}>{item.item}</h4>
            ) : (
              <h4>{item.item}</h4>
            )}
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
            >
              remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Index;
