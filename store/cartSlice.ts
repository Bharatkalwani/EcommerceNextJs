import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {CartItem} from '../types/index'

 interface CartState {
    items:CartItem[]
 }

const initalState:CartState ={
    items:[]
}

const cartSlice=createSlice({
name :"cart",
initialState:initalState,
reducers:{
    addToCart:(state,action:PayloadAction<CartItem>)=>{
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity:(state,action:PayloadAction<string>)=>{
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        existing.quantity -= 1;
      }
    },
}
})

export const { addToCart,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;