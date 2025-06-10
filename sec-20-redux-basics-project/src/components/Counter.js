import { useDispatch, useSelector } from "react-redux";

import classes from "./Counter.module.css";
import { counterActions } from "../store/index";
// import { useState } from "react";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);
  // const [showCounterState, setShowCounterState] = useState(showCounter);
  function handleIncrement() {
    dispatch(counterActions.increment());
  }
  function handleDecrement() {
    dispatch(counterActions.decrement());
  }
  function toggleCounterHandler() {
    dispatch(counterActions.toggle());
    // console.log(showCounter);
    // setShowCounterState(!showCounter);
  }
  function handleIncrease() {
    dispatch(counterActions.increase(5));
  }
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleIncrease}>+5</button>
        <button onClick={handleDecrement}>-</button>
      </div>

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
