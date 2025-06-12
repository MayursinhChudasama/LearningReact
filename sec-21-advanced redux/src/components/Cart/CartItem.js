import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import cartStore from "../../store/cartStore";

const CartItem = (props) => {
  const { title, quantity, total, price, description } = props.item;
  const dispatchCart = useDispatch();
  function handleIncrease(product) {
    console.log("increase qty", product);

    dispatchCart(cartStore.actions.increaseQty(product));
  }
  function handleDecrease(product) {
    console.log("decrease qty", product);

    dispatchCart(cartStore.actions.decreaseQty(product));
  }
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button
            onClick={() => {
              handleIncrease({
                quantity,
                title,
                price,
                description,
                total,
              });
            }}>
            +
          </button>
          <button
            onClick={() => {
              handleDecrease(props.item);
            }}>
            -
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
