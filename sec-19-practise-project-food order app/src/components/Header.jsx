import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import { CartContext } from "../store/cartContext";
export default function Header() {
  const { items } = useContext(CartContext);
  const itemsLength = items.reduce((total, cur) => total + cur.quantity, 0);
  return (
    <header id='main-header'>
      <div id='title'>
        <img
          src={logoImg}
          alt='A logo with dishes'
        />
        <h1>React Food App</h1>
      </div>
      <button className='text-button'>Cart({itemsLength})</button>
    </header>
  );
}
