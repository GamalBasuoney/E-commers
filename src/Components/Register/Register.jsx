import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../Register/Register.module.css'
import { useFormik } from 'formik'
// YUP - 1
import * as Yup from 'yup'
import axios from 'axios'
export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  let navigate = useNavigate()

  async function register(values) {
    console.log("showMe", values)
    setIsLoading(true)
    setErrorMessage(null)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err)=>{
    console.log(err)
    setIsLoading(false)
    setErrorMessage(err.response.data.message)
  })
    console.log(data);
    if (data.message == 'success') {
      setIsLoading(false)
      navigate('/Login')
    }}
  // YUP - 2
  let mySchema = Yup.object({
    name: Yup.string().required('Please enter name (Required)').min(3, 'Must be more than 3 characters').max(20, 'Must be max name 20 characters'),
    email: Yup.string().required('Please enter email (Required)').email('Invalid Format'),
    password: Yup.string().required('Please enter password (Required)').matches(/^[A-Z][a-z0-9]{3,8}$/gm, 'password must start with capital'),
    rePassword: Yup.string().required('Please enter rePassword (Required').oneOf([Yup.ref('password')], 'password and rePassword not matched'),
    phone: Yup.string().required('Please enter phone (Required)').matches(/^01[0125][0-9]{7}[^A-Za-z]$/gim, 'Invalid phone')
  })

  // FIRST WAY WITHOUT YUP - 1
  // function validate(values) {
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = "Please enter name (Required)"
  //   } else if (values.name.length < 3) {
  //     errors.name = 'Must be more than 3 characters'
  //   }

  //   if (!values.email) {
  //     errors.email = 'Please enter email (Required)'
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/igm.test(values.email)) {
  //     errors.email = 'Invalid Format'
  //   }

  //   if (!values.password) {
  //     errors.password = 'Please enter password (Required)'
  //   } else if (!/^[A-Z][a-z0-9]{3,8}$/gm.test(values.password)) {
  //     errors.password = 'password must start with capital'
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = 'Please enter rePassword (Required)'
  //   } else if (values.rePassword != values.password) {
  //     errors.rePassword = 'password and rePassword not matched'
  //   }

  //   if (!values.phone) {
  //     errors.phone = 'Please enter phone (Required)'
  //   } else if (!/^01[0125][0-9]{7}[^A-Za-z]$/gim.test(values.phone)) {
  //     errors.phone = 'Invalid phone'
  //   }
  //   return errors;
  // }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
      // YUP - 3
    }, validationSchema: mySchema,
    // FIRST WAY WITHOUT YUP - 2
    // validate
    onSubmit: (values) => register(values)
  })
  console.log(formik)

  return (
    <>
      <div className='container my-5'>
        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
          <h3 className='mb-4'>Register Now :</h3>
          {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}

          <label htmlFor="name">Name:</label>
          <input type="text" className='form-control mb-3' id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : null}

          <label htmlFor="ُemail">Email:</label>
          <input type="email" className='form-control mb-3' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}

          <label htmlFor="password">Password:</label>
          <input type="password" className='form-control mb-3' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}

          <label htmlFor="rePassword">RePassword:</label>
          <input type="password" className='form-control mb-3' id='rePassword' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null}

          <label htmlFor="phone">Phone:</label>
          <input type="tell" className='form-control mb-4' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}

          {isLoading ? <span className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></span> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white me-2'>Register</button>}

        </form>
      </div>
    </>
  )
}
