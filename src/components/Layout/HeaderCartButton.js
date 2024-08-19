import React, { useContext, useEffect, useState } from 'react'
import styles from "./HeaderCartButton.module.css"
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext)
  const [btnIsAnimated, setBtnIsAnimated] = useState(false)

  const numberOfCartItems = cartCtx.items.reduce((currNumber, item)=>{
    return currNumber + item.amount
  }, 0)

  const btnClasses = `${styles.button} ${btnIsAnimated ? styles.bump : ''}`

  useEffect(()=>{
    if (cartCtx.items.length === 0){
      return
    }
    setBtnIsAnimated(true)
    const timer = setTimeout(()=>{
      setBtnIsAnimated(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [cartCtx.items])

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={styles.icon}>
      <i className="fa-solid fa-cart-shopping"></i>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton