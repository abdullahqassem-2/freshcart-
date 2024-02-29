import React, { useContext } from 'react'
import style from './ShippingAddress.module.css'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function ShippingAddress() {
let{checkoutsession} = useContext(CartContext)
let {cartid} = useParams()
 async function checkout(ShippingAddress) {
let {data} = await checkoutsession(cartid,ShippingAddress);
if (data.status == 'success') {
  
  window.location.href = data.session.url
}
  console.log(data);

}



let formik =useFormik({
  initialValues:{
    details:'',
    phone:'',
    city:'',
  
  },onSubmit:checkout
  
  
  })


  return <>
  
  <div className="w-75 mx-auto">

    <form onSubmit={formik.handleSubmit}>
  <label htmlFor="details">details</label>
  <input onChange={formik.handleChange} type="text"  id='details' name='details' className='form-control mb-3'/>
  <label htmlFor="details">city</label>
  <input onChange={formik.handleChange} type="text"  id='city' name='city' className='form-control mb-3'/>
  <label htmlFor="details">phone</label>
  <input onChange={formik.handleChange} type="tel"  id='phone' name='phone' className='form-control mb-3'/>
   <button className='btn bg-main text-light' type='submit'>  checkout</button>
    </form>
  </div>

  
  
  
  
  
  </>
}
