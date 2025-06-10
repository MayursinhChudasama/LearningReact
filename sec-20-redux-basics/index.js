const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "plus") {
    return {
      counter: state.counter + 1,
    };
  }
  return state;
};

const store = redux.createStore(counterReducer);
console.log("before-->", store.getState());

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log("in fn-->", latestState);
};
store.dispatch({ type: "plus" });
store.subscribe(counterSubscriber);

store.dispatch({ type: "plus" });
