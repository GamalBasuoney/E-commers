import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { CartContext } from "../Context/CartContext";

export default function Checkout() {

  let { generateOnlinePayment, cardId } = useContext(CartContext)

  async function handlePayment(values) {
    console.log(values);
    let { data } = await generateOnlinePayment(cardId, values)
    console.log(data);
    if (data.session) {
      console.log(data.session.url);
      window.location.href = data.session.url
    }
  }

  let mySchema = Yup.object({
    details: Yup.string().required('Please enter details (Required)'),
    phone: Yup.string().required('Please enter phone (Required)').matches(/^01[0125][0-9]{7}[^A-Za-z]$/gim, 'Invalid phone'),
    city: Yup.string().required('Please enter city (Required)'),
  })

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    }, validationSchema: mySchema,
    onSubmit: handlePayment
  });

  return( 
   <>
    <div className="container my-5">
      <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>

        <label htmlFor="details">Details</label>
        <input type="text" className="form-control mb-3" id='details' name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.details && formik.touched.details ? <div className="alert alert-danger">{formik.errors.details}</div> : null}
        
        <label htmlFor="phone">Phone</label>
        <input type="tel" className="form-control mb-3" id='phone' name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}

        <label htmlFor="city">City</label>
        <input type="text" className="form-control mb-3" id='city' name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.city && formik.touched.city ? <div className="alert alert-danger">{formik.errors.city}</div> : null}
       
        <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn btn-outline-info w-100'>Pay</button>
      </form>
    </div>
  </>
  )
}
