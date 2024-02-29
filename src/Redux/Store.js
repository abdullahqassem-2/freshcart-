import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlide";
import { brandsreducer } from "./BrandSlice";
  export let store = configureStore({


    reducer:{
     counter: CounterReducer ,
     brand: brandsreducer
    }
  })