import React from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick';
export default function CategoriesSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  function getcategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {data} = useQuery ('categories',getcategories)
  return <>
  
<div className="row">
    
<Slider { ...settings}>
     {data?.data.data.map(category=> <div key={category._id} className="col-md-2">
      <div className="imge">
        <img className='w-100' height={200} src={category.image} alt={category.name}  />
        <p className=' text-center'>{category.name }</p>
      </div>
     </div>)}
      </Slider>
</div>
  
  </>
}