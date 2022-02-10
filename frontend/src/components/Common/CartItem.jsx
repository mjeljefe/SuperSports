import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  increaseCart,
  decreaseCart,
} from "../../reducks/carts/operations";
import { getCarts, getSubtotal } from "../../reducks/carts/selectors";

const CartItem = ({ cart, quantity, cartId }) => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const carts = getCarts(selector);
  const subtotal = getSubtotal(selector);

  const clickPlusCart = () => {
    dispatch(increaseCart(cartId));
  };
  const clickMinusCart = () => {
    dispatch(decreaseCart(cartId));
  };

  useEffect(() => {
    console.log(cart.image);
    console.log(cart);
    console.log(carts);
  }, []);

  return (
    <>
      <li class="row">
        <img
          src={"https://res.cloudinary.com/du5ox8ko4/" + cart.image}
          class="food-image"
        />
        <div class="info">
          <div class="name">
            {cart.name} <br></br>
            {cart.description}
          </div>
          <div class="info-bottom">
            <div class="price">$ {cart.price}</div>

            <button class="add">
              {" "}
              <span class="minus" onClick={clickMinusCart}>
                -
              </span>
              <span class="count">{quantity} </span>
              <span class="plus" onClick={clickPlusCart}>
                +
              </span>
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;
