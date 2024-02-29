import style from './Login.module.css'
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, {  useState } from 'react'
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [apiError, setapiError] = useState(null)
  let navigate = useNavigate()
       let {setUserToken} = useContext(UserContext)

  async function Loginsubmit(values) {
    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .catch((err) => {
        setapiError(err.response.data.message)
        setLoading(false)

      })
    if (data.message == 'success') {
      setLoading(false)
      localStorage.setItem('usertoken',data.token);
      setUserToken(data.token)
      navigate('/')


    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password'),




  })





  let formik = useFormik({

    initialValues: {
      email: "",
      password: "",
    }, validationSchema
    , onSubmit: Loginsubmit

  })

  return <>


<Helmet>
  
        <title> Login</title>
        <meta className="description" content="Helmet application" />
    </Helmet>


    <div className="w-75  mx-auto  py-4">
      <h2>Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ''
        }
        <label htmlFor="">Email</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' email='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : null}
        <label htmlFor="">Password</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' password='password' className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : null}

        {loading ? <button className='btn bg-main text-light ' type="submit" >
          <i className="fas fa-spinner fa-spin"></i>
        </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Login</button>
        }
        <Link className = 'ps-4' to= {'/register'}> Register Now</Link>
      </form>
    </div>





  </>

}
