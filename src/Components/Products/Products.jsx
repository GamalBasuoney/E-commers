import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from './../Redux/ProductSlice.js';

export default function Products() { 
  let products = useSelector((state)=> state.productRed)
  let dispatch = useDispatch();
  useEffect(()=>{ 
    dispatch(getProducts())
  }, [])
  console.log('product',products);

  return (
    <div className='p-5'>
      {/* <button className='btn btn-primary me-5' onClick={()=> dispatch((20))}>+++</button>
      <button className='btn btn-primary' onClick={()=> dispatch(decrease())}>---</button> */}

      <h1>{}</h1>
    </div>
  )
}
