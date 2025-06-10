import { useContext } from "react";
import { CartContext } from "../store/cartContext";
import { createPortal } from "react-dom";

export default function Modal({ ref }) {
  const { items, addItem, removeItem } = useContext(CartContext);
  return createPortal(
    <dialog
      ref={ref}
      className='modal'>
      <div className='cart'>
        <h2>Your Cart</h2>
        <ul>
          {items.map((item) => {
            return (
              <li
                className='cart-item'
                key={item.name}>
                <p>{item.name}</p>
                <span className='cart-item-actions'>
                  <button
                    onClick={() => {
                      removeItem(item.id);
                    }}>
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => {
                      addItem(item);
                    }}>
                    +
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
        <p className='cart-total'></p>
        <div className='modal-actions'>
          <button
            onClick={() => {
              ref.current.close();
            }}
            className='text-button'>
            {" "}
            Close{" "}
          </button>
          <button className='button'>Go to checkout</button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
