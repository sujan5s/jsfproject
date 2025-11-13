import React, { createContext, useContext, useReducer } from "react";

const CartState = createContext();
const CartDispatch = createContext();

const initial = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const found = state.items.find(i => i.plantId === action.item.plantId);
      if (found) {
        return { items: state.items.map(i => i.plantId === action.item.plantId ? { ...i, qty: i.qty + action.item.qty } : i) };
      }
      return { items: [...state.items, { plantId: action.item.plantId, qty: action.item.qty, plant: action.item.plant }] };
    }
    case "REMOVE":
      return { items: state.items.filter(i => i.plantId !== action.plantId) };
    case "CLEAR":
      return initial;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  return <CartDispatch.Provider value={dispatch}><CartState.Provider value={state}>{children}</CartState.Provider></CartDispatch.Provider>;
}

export const useCart = () => [useContext(CartState), useContext(CartDispatch)];