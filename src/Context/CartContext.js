import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {
let headers ={

    token: localStorage.getItem("usertoken")
}


function addTocart(productId){

    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{

    productId
},{
    headers

    })
    .then((response)=> response)
    .catch((err) =>  err)

}



function getCartItem(){

    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{

    headers

    })
    .then((response)=> response)
    .catch((err) =>  err)

}




function deleteCartItem(productId){

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{

    headers

    })
    .then((response)=> response)
    .catch((err) =>  err)

}


function UpdateCartItem(productId,count){

    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
    count
    },{
    headers

    })
    .then((response)=> response)
    .catch((err) =>  err)

}





function checkoutsession(cartid,shippingAddress){

    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:3004`,{

    shippingAddress
},{
    headers

    })
    .then((response)=> response)
    .catch((err) =>  err)

}



function clearCart(){

    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{

    headers

    })
    .then((response)=> response)
    .catch((err) =>  err)

}


let [numOfCartItems, setNumOfCartItems] = useState(0);
function plusNumOfCartItems(){
    setNumOfCartItems(numOfCartItems+=1)
}




return<CartContext.Provider  value={{addTocart,getCartItem,deleteCartItem,UpdateCartItem,checkoutsession,clearCart,numOfCartItems,setNumOfCartItems,plusNumOfCartItems}} >
{props.children}
</CartContext.Provider>

}