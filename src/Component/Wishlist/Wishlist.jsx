import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { WishlistContext } from '../../Context/WishListContext'
import { Watch } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'

export default function Wishlist() {
  let { getWishlistItem ,deleteWishlistItem} = useContext(WishlistContext)
  const [loading, setloading] = useState(true)
  const [Wishlist, setWishlist] = useState(null)

  async function getwishlist() {
    let { data } = await getWishlistItem();
    setWishlist(data);
    setloading(false);

  }


  async function deleteWishlist(id) {
    setloading(true)
    await deleteWishlistItem(id);
    
    // Create a new array that contains all the items from the current wishlist except the one you're deleting
    const updatedWishlist = Wishlist.data.filter(item => item._id !== id);
    
    // Set the state of the wishlist to the new array
    setWishlist({ data: updatedWishlist });
    setloading(false)
  }

  let { addTocart, setNumOfCartItems, plusNumOfCartItems } = useContext(CartContext)

  async function postToCart(id) {
    let { data } = await addTocart(id)
    if (data.status == 'success') {
      toast.success(data.message);
      plusNumOfCartItems()
      deleteWishlist(id); // Remove the product from the wishlist

    } else {
      toast.error(data.message)
    }

  }







  useEffect(() => {
    getwishlist()
  }, [])

  return (
    <>


<Helmet>
  
        <title> Wishlist</title>
        <meta name="description" content="Helmet application" />
    </Helmet>


      <div className="bg-main-light pt-2 mt-5">
        <h2 className=' d-flex justify-content-center align-items-center fw-bolder'>my Wishlist</h2>
{loading ? (
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
) :
  Wishlist && Wishlist.data.length > 0 ? (
    Wishlist.data.map(item => (
      <div key={item._id} className="row align-items-center   border-1 border-bottom p-2 m-0">
        <div className="col-md-2">
          <div className="img">
            <img className='w-100' src={item.imageCover}  />
          </div>
        </div>
        <div className="col-md-10">
          <p className=' text-black fw-bolder'>{item.title}</p>
          <p className=' text-main fw-bolder'> price {item.price} EGP</p>
          <button onClick={() => postToCart(item._id)} className=" btn btn-outline-success">Add to Cart</button>
          <button onClick={() => deleteWishlist(item._id)} className=" btn btn-outline-danger fs-6 mx-2"><i className='fas fa-trash-can '></i></button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center">Your wishlist is empty.</p>
  )}
      </div>
    </>
  )
}
