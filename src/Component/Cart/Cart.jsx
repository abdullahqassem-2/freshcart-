import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Watch } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Cart() {


  let { getCartItem, deleteCartItem, UpdateCartItem, clearCart,numOfCartItems , setNumOfCartItems} = useContext(CartContext)
  const [Cart, setCart] = useState(null)
  const [loading, setloading] = useState(true)



  async function getItems() {
    let { data } = await getCartItem();
    setCart(data)
    setloading(false)
  }
  async function deleteItems(id) {
    setloading(true)
    let { data } = await deleteCartItem(id);
    setCart(data)
    setloading(false)
  }

  async function handleClearCart() {
    setloading(true); // Set loading state to true to indicate that the cart is being cleared
    await clearCart(); // Call the clearCart function provided by the CartContext to clear all products from the cart
    setCart({ data: { products: [] } }); // Update the cart state to reflect that the cart is empty
    setloading(false);
    // Set loading state to false after the cart is cleared
  }
  async function updateItems(id, count) {

    if (count < 1) {
      let { data } = await deleteCartItem(id);
      setCart(data)


    } else {
      let { data } = await UpdateCartItem(id, count);
      setCart(data)

    }

  }


  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    // Update numOfCartItems whenever cart changes
    if (Cart) {
      setNumOfCartItems(Cart.data.products.length);
    }
  }, [Cart]);



  return <>

    <Helmet>

      <title> Cart</title>
      <meta className="description" content="Helmet application" />
    </Helmet>


    <div className="bg-main-light pt-2 mt-5">
      <h2 className=' d-flex justify-content-center align-items-center fw-bolder'>cart Shop</h2>
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
      ) : Cart && Cart.data.products.length > 0 ? (
        <>
          <div className=" d-flex justify-content-center align-items-center">

            <p className="text-black fw-bolder h4 p-2 mx-5">
              total number of items: {Cart.numOfCartItems}
            </p>
            <p className="text-black fw-bolder h4 p-2">
              total price : {Cart.data.totalCartPrice} EGP
            </p>
          </div>
          <div className="d-flex justify-content-between">

          <button className='btn btn btn-outline-danger mx-4' onClick={handleClearCart} >  Clear Cart </button>
            <Link
              to={`/ShippingAddress/${Cart.data._id}`}
              className="btn btn-outline-primary text-black mx-2 "
            >
              Check Out
            </Link>


          </div>
          {Cart.data.products.map(product => (
            <div key={product.product.id} className="row align-items-center border-1 border-bottom p-2 m-0">
              <div className="col-md-1">
                <div className="img">
                  <img className="w-100" src={product.product.imageCover} alt={product.product.title} />
                </div>
              </div>
              <div className="col-md-10">
                <div className="item">
                  <h3 className="h6 fw-bold">
                    {product.product.title.split(" ").slice(0, 3).join(" ")}
                  </h3>
                </div>
                <p className="text-main"> price {product.price} EGP</p>

                <button onClick={() => deleteItems(product.product.id)} className="btn btn-outline-danger fs-6 ">
                  <i className="fas fa-trash-can "></i>
                </button>

              </div>
              <div className="col-md-1">
                <div className="count d-flex align-items-center justify-content-center">
                  <button onClick={() => updateItems(product.product.id, product.count + 1)} className="btn border1">
                    +
                  </button>
                  <span className="mx-2">{product.count}</span>
                  <button onClick={() => updateItems(product.product.id, product.count - 1)} className="btn border1">
                    -
                  </button>
                </div>
              </div>
            </div>

          ))}
        </>
      ) : (
        <p className="text-center fw-bolder">Your cart is empty</p>
      )}
    </div>

  </>

}
