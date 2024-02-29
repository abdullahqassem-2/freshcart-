import { createSlice } from "@reduxjs/toolkit";
 
let initialState = {count:0,UserName:''}

let counterslice = createSlice({


    name:'conterslice',
    initialState ,
    reducers: { 
        increase:(state)=>{
            state.count +=1
        },
        decrease:(state)=>{
            state.count-=1
                    },
                    increasebyamount:(state,action)=>{
                        state.count   +=  action.payload
                                },
                        
    }
    
 })
 export let CounterReducer = counterslice.reducer
 export  let {increase,decrease,increasebyamount} = counterslice.actions;