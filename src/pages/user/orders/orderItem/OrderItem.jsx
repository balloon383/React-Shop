import React, { useEffect, useState } from 'react'
import images from '../../../../images';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../../../../redux/actions/productActions';
import style from './Item.module.css'

export default function OrderItem({ obj }) {

  const dispatch = useDispatch()
  let [item, setItem] = useState({})
  
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch])

  const products = useSelector(store => store.products)

  useEffect(() => {
    if (products.length > 0) {
      let item = products.find((el) => el.id === obj.id);
      item = { ...item, count: obj.count }
      setItem(item)
    }
  }, [products, obj.count, obj.id])

  return (
    <tr>
      <td className={style.item_description}>
        <img
          src={images[item.img]}
          alt="item img"
          width="150px"
          height="150px"
        />{" "}
        {item.title}
      </td>
      <td>{item.price}</td>
      <td>{item.sale ? -item.salePercent + "%" : "-"}</td>
      <td>{item.count}</td>
      <td>
        $
        {item.sale
          ? item.price * item.count -
            (item.price * item.count * item.salePercent) / 100
          : item.price * item.count}
      </td>
    </tr>
  );
}
