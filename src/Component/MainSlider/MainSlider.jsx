import React from 'react'
import style from './MainSlider.module.css'
import  slide3 from '../../Assets/images/slider-image-3.jpeg'
import  slide2 from '../../Assets/images/slider-image-2.jpeg'
import  slide1 from '../../Assets/images/slider-image-1.jpeg'
import  slide4 from '../../Assets/images/blog-img-2.jpeg'
import  slide5 from '../../Assets/images/1681511156008.png'



import  img1 from '../../Assets/images/lap.png'
import Slider from 'react-slick'



export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };


  return <>
  
  <div className="row my-3 gx-0">
    <div className="col-md-9 ">
      <Slider { ...settings}>
        <img className='w-100' src={slide3} height={400}   />
        <img className='w-100' src={slide2}  height={400} />
        <img className='w-100' src={slide4}  height={400} />

      </Slider>
    </div>
    <div className="col-md-3">
    <img className='w-100' src={img1} height={200}   />
     <img className='w-100' src={slide5}  height={200} />
    </div>
  </div>
  
  </>
    
  
}
