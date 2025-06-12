import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cart = useSelector((state) => state.cartStore);
  console.log("cart", cart);
  const cartEmpty = cart.length == 0;
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartEmpty && <li>No product in the cart</li>}
        {!cartEmpty &&
          cart.map((product) => (
            <CartItem
              key={product.title}
              item={product}
            />
          ))}
      </ul>
    </Card>
  );
};

export default Cart;
