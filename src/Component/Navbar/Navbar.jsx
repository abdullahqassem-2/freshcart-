import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { useSelector } from 'react-redux'
import { CartContext } from '../../Context/CartContext'
import { useQuery } from 'react-query'
import axios from 'axios'
export default function Navbar() {

  // let { getCartItem, deleteCartItem, UpdateCartItem } = useContext(CartContext)
  // const [Cart, setCart] = useState(null)
  // const [loading, setloading] = useState(true)

  // async function getItems() {
  //   let { data } = await getCartItem();
  //   setCart(data)

  //   setloading(false)
  // }
  // async function deleteItems(id) {
  //   setloading(true)
  //   let { data } = await deleteCartItem(id);
  //   setCart(data)
  //   setloading(false)
  // }
  // async function updateItems(id, count) {

  //   if (count < 1) {
  //     let { data } = await deleteCartItem(id);
  //     setCart(data)


  //   } else {
  //     let { data } = await UpdateCartItem(id, count);
  //     setCart(data)

  //   }

  // }


//   let headers ={

//     token: localStorage.getItem("usertoken")
// }

//   function GetNavbar(params) {
//     return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {

//       headers

//     })
//       .then((response) => response)
//       .catch((err) => err)

//   }

//   let { data, isLoading, isError, isFetching } = useQuery('getnavbar', GetNavbar, {

//     refetchInterval: 1000
//   })


const { numOfCartItems,setNumOfCartItems } = useContext(CartContext);

const [Cart, setCart] = useState(null)



  let { UserToken, setUserToken } = useContext(UserContext)
  let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem('usertoken')
    setUserToken(null)
    navigate('/Login')

  }

  useEffect(() => {
    if (Cart) {
      setNumOfCartItems(Cart.data.products.length);
    }
  }, [Cart]);

  return <>

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/'}>
          <img src={logo} alt="freshcart"  />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {UserToken != null ? <>

              <li className="nav-item ">
                <Link className="nav-link text-black fw-bold" to={'/'}>Home</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link text-black fw-bold" to={'cart'}>Cart</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link text-black fw-bold" to={'Wishlist'}>Wishlist</Link>
              </li>

              <li className="nav-item ">
                <Link className="nav-link text-black fw-bold" to={'products'}>Products</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link text-black fw-bold" to={'categories'}>Categories</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link text-black fw-bold" to={'brands'}>Brands</Link>
              </li>


            </> : ''}

          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    



            {UserToken != null ? <>
              <li className="nav-item">
                <Link className="nav-link fw-bolder" to={'cart'}>
                <i className="ahmed fa-solid fa-cart-shopping fs-1 mx-5 Cicon">
                  {numOfCartItems > 0 && <span className='mx-1' ><sup>{numOfCartItems}</sup></span>}
                  </i>
                </Link>
                </li>
          

              
                <li className="nav-item">
                <span onClick={logOut} className="nav-link cursor-pointer fw-bold fs-4 text-black">Logout</span>
              </li>



            </> : <>
            <li className="nav-item  d-flex align-items-center ">
              <i className ='fab fa-facebook me-2'></i>
              <i className ='fab fa-instagram me-2'></i>
              <i className ='fab fa-twitter me-2'></i>
              <i className ='fab fa-youtube me-2'></i>
            </li>


              <li className="nav-item">
                <Link className="nav-link" to={'register'}>Register</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={'login'}>Login</Link>
              </li>

         
            </>
            } 
      

          </ul>

        </div>
      </div>
    </nav>






  </>
}
