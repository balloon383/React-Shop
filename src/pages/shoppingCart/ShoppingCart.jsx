import React from 'react'
import Cart from './cartList/Cart'
import Summary from './summary/Summary'
import styles from './Cart.module.css'

export default function ShoppingCart() {
  return (
    <section className={styles.cart__container}>
      <Cart/>
      <Summary/>
    </section>
  )
}
