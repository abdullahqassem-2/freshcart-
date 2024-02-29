import React, { useEffect } from 'react'
import style from './Brands.module.css'
import { getbrands } from '../../Redux/BrandSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Watch } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'


export default function Brands() {
  const { brands, isloading } = useSelector(({ brand }) => brand)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getbrands())
  }, [])

  return (
    <>
    
<Helmet>
  
  <title> Brands</title>
  <meta name="description" content="Helmet application" />
</Helmet>
      {isloading ? (
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
      ) : (
        <div className="row py-5">
          {brands && brands.length > 0 ? (
            brands.map(brand => (
              <div key={brand._id} className="col-md-2">
                <div className="product">
                  <img src={brand.image} className="w-100"  />
                  <p className='text-center'>{brand.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No brands found</p>
          )}
        </div>
      )}
    </>
  )
}