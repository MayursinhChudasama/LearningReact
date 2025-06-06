import Header from "./components/Header";
import Meals from "./components/Meals";
import CartProvider from "./store/cartContext";

function App() {
  return (
    <CartProvider>
      <Header />
      <Meals />
    </CartProvider>
  );
}

export default App;
