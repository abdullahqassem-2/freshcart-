import React, { useContext, useEffect } from 'react'
import Layout from './Component/Layout/Layout'
import Brands from './Component/Brands/Brands'
import Cart from './Component/Cart/Cart'
import Categories from './Component/Categories/Categories'
import Proudct from './Component/Proudct/Proudct'
import Home from './Component/Home/Home'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import Notfond from './Component/Notfond/Notfond'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserContextProvider, { UserContext } from './Context/UserContext'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import ShippingAddress from './Component/ShippingAddress/ShippingAddress'
import AllOreders from './Component/AllOreders/AllOreders'
import Wishlist from './Component/Wishlist/Wishlist'

export default function App() {




  
let routers = createBrowserRouter([

{path:'',element:<Layout/>, children:[
  {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:'cart',element: <ProtectedRoute><Cart/> </ProtectedRoute>},
  {path:'products',element: <ProtectedRoute><Proudct/> </ProtectedRoute>},
  {path:'AllOreders',element: <ProtectedRoute><AllOreders/> </ProtectedRoute>},
  {path:'categories',element:<ProtectedRoute><Categories/> </ProtectedRoute>},
  {path:'Wishlist',element:<ProtectedRoute><Wishlist/> </ProtectedRoute>},

  {path:'ShippingAddress/:cartid',element:<ProtectedRoute><ShippingAddress/> </ProtectedRoute>},
  {path:'brands',element: <ProtectedRoute><Brands/> </ProtectedRoute>},
  {path:'ProductDetails/:id',element: <ProtectedRoute><ProductDetails/> </ProtectedRoute>},
  {path:'register',element:<Register/>},
  {path:'Login',element:<Login/>},
  {path:'*',element:<Notfond/>},





]}

])

   let {setUserToken}  = useContext(UserContext)

   useEffect(()=>{
    if (localStorage.getItem('usertoken')) {
      setUserToken(localStorage.getItem('usertoken'));
     }

   },[])
  return <>
  
  <Provider store={store}>
<RouterProvider router={routers}>
</RouterProvider>
<Toaster/>
</Provider>

  
  
  </>
   
}
