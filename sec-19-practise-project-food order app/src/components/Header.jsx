import { useContext, useRef } from "react";
import logoImg from "../assets/logo.jpg";
import { CartContext } from "../store/cartContext";
import Modal from "./Modal";
export default function Header() {
  const dialog = useRef();
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
      <button
        onClick={() => {
          dialog.current.showModal();
        }}
        className='text-button'>
        Cart({itemsLength})
      </button>
      <Modal ref={dialog} />
    </header>
  );
}
