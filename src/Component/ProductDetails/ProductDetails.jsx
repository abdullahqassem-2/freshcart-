import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";


import { Watch } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
export default function ProductDetails() {
  const [detalis, setdetalis] = useState({})
  const [loading, setloading] = useState(true)
  let { addTocart,setNumOfCartItems,plusNumOfCartItems } = useContext(CartContext)

  async function postToCart(id){
    let {data}= await addTocart(id)
    if (data.status == 'success'){
      toast.success(data.message);
      plusNumOfCartItems()
    } else {
      toast.error(data.message)
    }

  }
  let { id } = useParams()
  console.log(id);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };


  async function getProductdetails(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setdetalis(data.data)
    setloading(false)
  }


  useEffect(() => {
    getProductdetails(id)


  }, [])



  return <>

    {loading ? <div className="row">
<div className="loading">
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=" justify-content-center mt-5"
      />
      </div>
    </div> :
      <>
        <Helmet>

          <title> {detalis.title} </title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <div className="row align-items-center mt-5">
          <div className="col-md-4">
            <Slider {...settings}>
              {detalis.images.map(image => <img src={image} key={detalis.id} alt={detalis.title} />)}
            </Slider>

          </div>
          <div className="col-md-8">


            <div className="detalis "  >



              <h3 className='h5'>{detalis.title}</h3>
              <p className='py-3'> {detalis.description}</p>
              <span className='font-sm text-main'>  {detalis.category.name} </span>

              <div className="d-flex py-3  justify-content-between align-items-center ">
                <span className='font-sm'>{detalis.price} EGP</span>
                <span className='font-sm '> {detalis.ratingsAverage} 
                <i className='fas fa-star rating-color ms-1'></i>

                </span>


              </div>
              <button onClick={() => postToCart(detalis.id)} className='btn bg-main text-light w-100 btn-sm' >Add To Cart</button>

            </div>
          </div>
        </div>
      </>


    }
  </>

}
