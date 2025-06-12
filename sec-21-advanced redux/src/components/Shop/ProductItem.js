import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import cartStore from "../../store/cartStore";

const ProductItem = (props) => {
  const addToCartDispatch = useDispatch();
  function handleAddToCart(product) {
    console.log("addtocart", product);

    addToCartDispatch(cartStore.actions.increaseQty(product));
  }
  const { title, price, description } = props;

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button
            onClick={() => {
              handleAddToCart({
                quantity: 1,
                title,
                price,
                description,
              });
            }}>
            Add to Cart
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
