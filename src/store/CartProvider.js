import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM"){
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
    const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)
    const existingItem = state.items[existingItemIndex]
    let updatedItems ;
    if (existingItem){
      const updatedItem = {
        ...existingItem,
        amount : existingItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    return ({
      items : updatedItems,
      totalAmount: updatedTotalAmount
    })
  }

  else if (action.type === "REMOVE_ITEM"){
    const existingItemIndex = state.items.findIndex((item) => item.id === action.id)
    const existingItem = state.items[existingItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems ;
    if (existingItem.amount === 1){
      updatedItems = state.items.filter((item) => item.id !== action.id)
    }else {
      const updatedItem = {
        ...existingItem,
        amount : existingItem.amount - 1
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    }
    return {
      items : updatedItems,
      totalAmount : updatedTotalAmount
    }
  }
  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItem = (item) => {
      dispatchCartAction({type: "ADD_ITEM", item: item})
    }
    const removeItem = (id) => {
      dispatchCartAction({type:"REMOVE_ITEM", id: id})
    }
  return (
    <CartContext.Provider value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem : addItem,
        removeItem: removeItem
    }}>{props.children}</CartContext.Provider>
  )
}

export default CartProvider