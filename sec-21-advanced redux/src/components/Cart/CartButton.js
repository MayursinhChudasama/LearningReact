import { useDispatch } from "react-redux";
import classes from "./CartButton.module.css";
import cartShow from "../../store/cartShow";

const CartButton = (props) => {
  const showCartDispatch = useDispatch();
  function handleShowCart() {
    console.log(cartShow);
    showCartDispatch(cartShow.actions.showCart());
  }
  return (
    <button
      onClick={handleShowCart}
      className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
