import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import store from "./store/index.js";
import { useEffect } from "react";
import cartShow from "./store/cartShow.js";
import Notification from "./components/UI/Notification.js";

let isInitial = true;
function App() {
  const showCart = useSelector((state) => state.cartShow.showCart);
  const notification = useSelector((state) => state.cartShow.notification);
  const cart = useSelector((state) => state.cartStore);

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      if (isInitial) {
        isInitial = false;
        return;
      }
      dispatch(
        cartShow.actions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Request is sending...",
        })
      );

      const response = await fetch(
        "https://learningreact-a83cf-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
      dispatch(
        cartShow.actions.showNotification({
          status: "success",
          title: "Sucess!",
          message: "Request is sent!!",
        })
      );
    };
    // sendCartData
    // const responseData = await response.json();
    sendCartData().catch((error) =>
      dispatch(
        cartShow.actions.showNotification({
          status: "error",
          title: "Error!",
          message: "Something went wrong!",
        })
      )
    );
  }, [cart]);

  return (
    <>
      <Notification
        title={notification?.title}
        status={notification?.status}
        message={notification?.message}
      />
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
