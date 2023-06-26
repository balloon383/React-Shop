import React from "react";
import Orders from "./orders/Orders";
import Info from "./info/Info";
import styles from "./User.module.css"

export default function User() {
  return (
    <section className={styles.user__box}>
        <Orders />
        <Info />
    </section>
  );
}
