import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import cartShow from "../../store/cartShow";

const CartButton = (props) => {
  const showCartDispatch = useDispatch();
  const cart = useSelector((state) => state.cartStore);
  const totalProdutsQuantity = cart
    .map((item) => item.quantity)
    .reduce((total, cur) => total + cur, 0);
  console.log(totalProdutsQuantity);

  function handleShowCart() {
    console.log(cartShow);
    showCartDispatch(cartShow.actions.showCart());
  }
  return (
    <button
      onClick={handleShowCart}
      className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalProdutsQuantity}</span>
    </button>
  );
};

export default CartButton;
