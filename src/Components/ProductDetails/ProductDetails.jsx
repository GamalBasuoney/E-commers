import { useParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../Context/CartContext';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function ProductDetails() {

  let { createCart } = useContext(CartContext)

  let { id } = useParams()
  console.log(id);

  const [productDetails, setProductDetails] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getProductDetails() {
    setIsLoading(true)

    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setIsLoading(false)
    console.log(data.data);
    setProductDetails(data.data)
  }

  async function generateCart(productId) {
    let response = await createCart(productId)
    console.log(response);
    if (response.data.status == 'success') {
      toast.success(response.data.message, {
        position: 'top-right',
        className: 'text-center border-2 box-shadow border-success'
      })
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <Helmet>
        <title>ProductDetails</title>
      </Helmet>

      <div className='container py-5'>
        <div className='row align-items-center'>
          <div className='col-md-4 py-5'>
            <div className='w-75'>
              <Slider {...settings}>
                {productDetails?.images?.map((img) => <div>
                  <img className='w-100' src={img} />
                </div>)}
              </Slider>
            </div>
          </div>
          <div className='col-md-8'>
            <h1>{productDetails.title}</h1>
            <p>{productDetails.description}</p>
            <div className='d-flex justify-content-between'>
              <p>{productDetails.price}EGP</p>
              <div>
                <i className='fa fa-star rating-color'></i>
                <span>{productDetails.ratingsAverage}</span>
              </div>
            </div>
            {isLoading ? <span className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></span> : <button onClick={() => generateCart(productDetails._id)} className='btn bg-main text-white w-100'>+ Add</button>}
          </div>
        </div>
      </div>
    </>
  )
}
