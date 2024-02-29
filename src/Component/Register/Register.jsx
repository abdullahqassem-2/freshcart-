import React, { useState } from 'react'
import style from './Register.module.css'
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Register() {

  const [loading, setLoading] = useState(false)
  const [apiError, setapiError] = useState(null)
   let navigate = useNavigate()

  async function registersubmit(values) {
    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .catch((err) => { setapiError(err.response.data.message) 
      setLoading(false)
      
      })
    if (data.message == 'success') {
      setLoading(false)
      navigate( '/Login')


    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, 'min length is 3').max(10, 'max length is 10'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password'),
    rePassword: Yup.string().required('Password is required').oneOf([Yup.ref('password')], "Passwords don't match"),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, "we need egyption number"),




  })





  let formik = useFormik({

    initialValues: {
      name: " ",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, validationSchema
    , onSubmit: registersubmit

  })

  return <>


  
<Helmet>
  
  <title> Register</title>
  <meta name="description" content="Helmet application" />
</Helmet>
    <div className="w-75  mx-auto  py-4">
      <h2>Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ''
        }
        <label htmlFor="">Name</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name' name='name' className='form-control mb-3' />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-2">{formik.errors.name}</div> : null}
        <label htmlFor="">Email</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' email='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : null}
        <label htmlFor="">Password</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' password='password' className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : null}
        <label htmlFor="">rePassword</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger py-2">{formik.errors.rePassword}</div> : null}

        <label htmlFor="">Phone</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger py-2">{formik.errors.phone}</div> : null}
        {loading ? <button className='btn bg-main text-light ' type="submit" >
          <i className="fas fa-spinner fa-spin"></i>
        </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>register</button>
      
        }
        <Link className = 'ps-4' to= {'/Login'}> Login Now</Link>

      </form>
    </div>





  </>
}
