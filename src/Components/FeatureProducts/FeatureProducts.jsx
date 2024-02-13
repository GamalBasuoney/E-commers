import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Products from './../Products/Products';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';

export default function FeatureProducts() {

  let { createCart, setNumOfCartItems } = useContext(CartContext)
  const [allProducts, setAllProducts] = useState([])

  async function getProducts() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    console.log('featche', data.data);
    setAllProducts(data.data)
  }

  async function generateCart(productId) {
    let response = await createCart(productId)
    console.log(response);
    if (response.data.status == 'success') {
      toast.success(response.data.message, {
        position: 'top-right',
        className: 'text-center border-2 box-shadow border-success'
      })
      setNumOfCartItems(response.data.numOfCartItems)
    }else {toast.error(response.data.message, {
        position: 'top-right',
        className: 'text-center border-2 box-shadow border-success'
      })
    }
  }
  
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className='container py-5'>
        <div className='row'>
          {allProducts.map((Products) => <div key={Products._id} className='col-md-2'>
            <div className='product px-2 py-3'>
              <Link to={'products-details/' + Products._id}>
                <img src={Products.imageCover} className='w-100' />
                <p className='text-main'>{Products.category.name}</p>
                <h3 className='h6'>{Products.title.split(' ').splice(0, 2).join(' ')}</h3>
                <div className='d-flex justify-content-between'>
                  <p>{Products.price}EGP</p>
                  <div>
                    <i className='fa fa-star rating-color'></i>
                    <span>{Products.ratingsAverage}</span>
                  </div>
                </div>
              </Link>
              <button onClick={() => generateCart(Products._id)} className='btn bg-main text-white w-100'>+ Add</button>
            </div>
          </div>)}
        </div>
      </div>
    </>
  )
}