import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {

  const [cartDetails, setCartDetails] = useState({})
  let { getCart, updateCart, removeCartItem } = useContext(CartContext)

  async function getCardDetails() {
    let res = await getCart()
    console.log(res);
    setCartDetails(res.data)
  }

  async function updateCartHandle(id,count) {
    let res = await updateCart(id,count)
    console.log(res);
    setCartDetails(res.data)
  }

  async function removeCartItemHandle(id) {
    let res = await removeCartItem(id)
    console.log(res);
    setCartDetails(res.data)
  }

  useEffect(() => {
    getCardDetails()
  }, [])

  return (
    <>
      {/* <h4>Total Price: {cartDetails?.data?.totalCartPrice}</h4> */}
      {cartDetails.data && <div className='container py-5 my-5'>
        <div className='bg-main-light p-5'>
          <h3 className='text-center'>Cart Details</h3>
          <h4>Number of Product: {cartDetails.numOfCartItems}</h4>
          <h4>Total Price: {cartDetails.data.totalCartPrice}</h4>

          {cartDetails.data.products.map((product) => <div key={product.product.brand._id} className='row border-bottom p-3'>
            <div className='col-md-1'>
              <img src={product.product.imageCover} className='w-100' alt="" />

            </div>

            <div className='col-md-11 d-flex justify-content-between'>
              <div>
                <h4>{product.product.title.split(' ').splice(0, 2).join(' ')}</h4>
                <p className='text-main'>{product.price}EGP</p>
                <button className='btn text-danger' onClick={()=>removeCartItemHandle(product.product._id)}><i className="fa-solid fa-trash-can me-1"></i>Remove</button>
              </div>
              <div className='d-flex align-items-center'>
                <button className='btn btn-cart bg-main text-white' onClick={()=>updateCartHandle(product.product._id,product.count+1)} >+</button>
                <p className='mx-3 mb-0'>{product.count}</p>
                <button className='btn btn-danger' onClick={()=>updateCartHandle(product.product._id,product.count-1)} >-</button>
              </div>
            </div>
          </div>)}

          <Link to={'/Checkout'} className='btn bg-main text-white mt-5'>Proceed to payment</Link>

        </div>
      </div>}
    </>
  )
}