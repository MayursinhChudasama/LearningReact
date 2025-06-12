import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import store from "./store/index.js";
import { useEffect } from "react";

function App() {
  const showCart = useSelector((state) => state.cartShow.showCart);
  const cart = useSelector((state) => state.cartStore);
  // console.log("cart-->", cart);
  useEffect(() => {
    fetch("https://learningreact-a83cf-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
