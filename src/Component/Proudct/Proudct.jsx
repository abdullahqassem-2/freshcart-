
import React, { useContext, useState } from 'react'
import style from './Proudct.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { increase,decrease,increasebyamount } from '../../Redux/CounterSlide'
import axios from 'axios'
import { Watch } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishListContext'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'

export default function Proudct() {




return <>

<FeaturedProducts/>
</>

}