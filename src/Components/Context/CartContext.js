import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CartContext = createContext(0);

export default function CartContextProvider(props) {

const [numOfCartItems, setNumOfCartItems] = useState(0)
const [cardId, setCardId] = useState(null)

  useEffect(()=> {
    getInitialValues()
  },[])

  async function getInitialValues(){
    let { data } = await getCart();
    console.log(data);
    if(data.status == 'success') {
      setNumOfCartItems(data.numOfCartItems)
      setCardId(data.data._id)
      console.log(data.numOfCartItems,data.data._id);
    }}

  let headers = { token: localStorage.getItem("userToken") };

  function createCart(x) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",

        { productId: x },
        { headers, })
      .then((res) => res)
      .catch((err) => err);
  }

  function getCart(x) {
    return axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/cart",

        { headers, })
      .then((res) => res)
      .catch((err) => err);
  }

  function updateCart(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

        { count },
        { headers, })
      .then((res) => res)
      .catch((err) => err);
  }

  function removeCartItem(id) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

        { headers, })
      .then((res) => res)
      .catch((err) => err);
  }

  function generateOnlinePayment(cartId,shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,  
          { shippingAddress },
          { headers, })
      .then((res) => res)
      .catch((err) => err);
  }

  const [cart] = useState(0);

  return (
    <CartContext.Provider
      value={{ cart, createCart, getCart, updateCart, removeCartItem, generateOnlinePayment, numOfCartItems, cardId, setNumOfCartItems }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
