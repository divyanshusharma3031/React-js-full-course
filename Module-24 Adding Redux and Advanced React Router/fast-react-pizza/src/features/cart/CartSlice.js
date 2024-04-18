import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload=newItem.
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload=pizzaId
      state.cart = state.cart.filter((item) => {
        return item.pizzaId !== action.payload;
      });
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => {
        return item.pizzaId === action.payload;
      });
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => {
        return item.pizzaId === action.payload;
      });
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if(item.quantity===0)
      {
        CartSlice.caseReducers.deleteItem(state,action);
      }
    },
    clearCart(state) {
        state.cart=[];
    },
  },
});

export const {addItem,deleteItem,increaseItemQuantity,decreaseItemQuantity,clearCart}=CartSlice.actions
export const getTotalPrice=((state)=>{
    let price=0;
    state.cart.cart.forEach((item)=>{
        console.log(item);
        price+=item.totalPrice
    });
    return price;
})
export const getCurrentQuantityById=((state,id)=>{
    // console.log(state.cart.cart.length);
    let x=0;
    state.cart.cart.forEach((item)=>{
        // console.log(item);
        if(item.pizzaId===id)
        {
            x=item.quantity;
        }
    });
    return x;
})
export default CartSlice.reducer;