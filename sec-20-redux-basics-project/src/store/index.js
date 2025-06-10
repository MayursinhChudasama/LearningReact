import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counter = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      return {
        ...state,
        counter: state.counter + 1,
      };
    },
    decrement(state) {
      return {
        ...state,
        counter: state.counter - 1,
      };
    },
    increase(state, action) {
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    },
    toggle(state) {
      return {
        ...state,
        showCounter: !state.showCounter,
      };
    },
    reset(state) {
      return {
        ...state,
        counter: 0,
      };
    },
  },
});

const initialAuthState = {
  isLoggedIn: false,
};
const authentication = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    logIn(state) {
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.isLoggedIn = false;
    },
  },
});
const store = configureStore({
  reducer: { counter: counter.reducer, auth: authentication.reducer },
});

export const counterActions = counter.actions;
export const authenticationActions = authentication.actions;

export default store;

// const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     return {
//       ...state,
//       counter: state.counter + 1,
//     };
//   }
//   if (action.type === "decrement") {
//     return {
//       ...state,
//       counter: state.counter - 1,
//     };
//   }
//   if (action.type === "increase") {
//     return {
//       ...state,
//       counter: state.counter + action.amount,
//     };
//   }
//   if (action.type === "reset") {
//     return {
//       ...state,
//       counter: 0,
//     };
//   }
//   if (action.type === "toggle") {
//     return {
//       ...state,
//       showCounter: !state.showCounter,
//     };
//   }
//   return state;
// };
