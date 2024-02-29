import React, { useContext, useEffect, useState } from 'react'
import style from './Categories.module.css'
import toast from 'react-hot-toast';
import axios from 'axios';



import { Watch } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Categories() {


   const [categories, setcategories] = useState([])
   const [loading, setloading] = useState(true)

   async function getcategories() {
   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   setcategories(data.data)
   setloading(false)
   }
   useEffect(()=>{
    getcategories()
   },[])








  return <>
  
<Helmet>
  
  <title> Categories</title>
  <meta name="description" content="Helmet application" />
</Helmet>
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
  </div>
    : <div className="row gy-2">
      {categories.map(product =>
        <div className="col-md-2 d-flex justify-content-center align-items-center mt-5" key={product.id}>
          <div className="product p-3">
              <img src={product.image} height={250} width={200}   />
              <span className='font-sm text-main'>  {product.name} </span>
            
          </div>

        </div>




      )}
    </div>}


</>
}
