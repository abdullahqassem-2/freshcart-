import React, { useContext, useEffect, useState } from 'react'
import style from './FeaturedProducts.module.css'

import axios from 'axios'
import { Watch } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import ProductDetails from '../ProductDetails/ProductDetails'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishListContext'



export default function FeaturedProducts() {
  const [loading, setloading] = useState(true)
  const [Cart, setCart] = useState(null)

  const [searchTerm, setSearchTerm] = useState('');



  let { getCartItem, deleteCartItem, UpdateCartItem, clearCart } = useContext(CartContext)
  async function getItems() {
    let { data } = await getCartItem();
    setCart(data)
    setloading(false)
  }
 


  function getproducts(params) {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')

  }
  const { data, isLoading, isError, isFetching } = useQuery('featuredproduct', getproducts, {
  });
  
  
  let { addTocart, setNumOfCartItems, plusNumOfCartItems } = useContext(CartContext)

 

  async function postToCart(id) {
    let { data } = await addTocart(id)
    if (data.status == 'success') {
      toast.success(data.message);
      plusNumOfCartItems()
    } else {
      toast.error(data.message)
    }

  }



  let { addToWishlist } = useContext(WishlistContext)

  async function postToWishlist(id) {
    let { data } = await addToWishlist(id)
    if (data.status == "success") {
      toast.success(data.message,
        { duration: 2000 })

    }
  }

  let filteredData = data?.data.data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (Cart) {
      setNumOfCartItems(Cart.data.products.length);
    }
  }, [Cart]);

  return <>
    <input className='form-control mt-4 mb-5' type="text " placeholder="Search" onChange={(event) => { setSearchTerm(event.target.value) }} />
    {isLoading ? <div className="row">
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
      : <div className="row gy-4">
        {filteredData.map(product =>

          <div className="col-lg-2" key={product.id}>
            <div className="product  p-3">
              <Link to={`/ProductDetails/${product.id}`}>
                <img src={product.imageCover} className='w-100' />
                <span className='font-sm text-main'>  {product.category.name} </span>
                <h3 className='h5'>{product.title.split(" ").splice(0, 2).join(" ")}</h3>

                <div className="d-flex py-3  justify-content-between align-items-center">
                  <span className='font-sm'>{product.price} EGP</span>
                  <span className='font-sm '>
                    {product.ratingsAverage}
                    <i className='fas fa-star rating-color ms-1'></i>
                  </span>

                </div>
              </Link>

              <button onClick={() => postToCart(product.id)} className='btn bg-main text-light w-100 btn-sm' >Add To Cart</button>
              <button onClick={() => postToWishlist(product.id)} className=' btn btn-danger my-2 w-100 btn-sm'> addToWishlist  </button>

            </div>

          </div>




        )}
      </div>}


  </>

}
