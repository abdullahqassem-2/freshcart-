import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'
import Footer from '../Footer/Footer'
export default function Home() {
  return <>

<Helmet>
  
        <title> home</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
 
   <MainSlider/> 
<CategoriesSlider/>
  <FeaturedProducts/>
  </>
}
