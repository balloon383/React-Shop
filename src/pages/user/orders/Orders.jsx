import React from 'react'
import { useSelector } from 'react-redux';
import OrderItem from "./orderItem/OrderItem"
import styles from './Orders.module.css'

export default function Orders() {

  let orders = useSelector(store => store.user.orders)
  
  return (
    <section className={styles.orders__box}>
      <table className={styles.table}>
        <tbody className={styles.table__body}>
          <tr className={styles.table__header}>
            <td>Item description</td>
            <td>Price</td>
            <td>Sale</td>
            <td>Quantity</td>
            <td>Total</td>
          </tr>
          {orders.map(el => <OrderItem obj={el} key={ Math.random() * 100000 } />) }
        </tbody>
      </table>
    </section>
  );
}
