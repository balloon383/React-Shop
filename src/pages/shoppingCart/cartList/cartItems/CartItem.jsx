import React, { useEffect, useState } from 'react'
import images from '../../../../images'
import { changeStatus, getLoggedUser } from '../../../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from '../../../../redux/actions/userActions'
import styles from "./Item.module.css"
export default function CartItem({ obj }) {
  
  const dispatch = useDispatch();
  let products = useSelector((state) => state.products);
  let [item, setItem] = useState({})

  useEffect(() => {
    if (products.length > 0) {
      let curItem = products.find((el) => el.id === obj.id);
      curItem = {...curItem, count: obj.count}
      setItem(curItem);
    }
  }, [products, obj.id, obj.count]);

  

  const [itemCounter, setItemCounter] = useState(obj.count)
  const [totalPrice, setTotalPrice] = useState(
    item.sale ? 
    (item.price * item.count) - ((item.price * item.count) * item.salePercent / 100)  
    : 
    item.price * item.count
    )
  
  function validateCount(e) {
    let count = e.target.value
    if (count < 1) {
      setItem({...item, count: 1})
    }
    if (count > 10) {
      setItem({...item, count: 10})
    }
  }

  function setCount(e){
    let count = e.target.value
    if (count < 0){
      count = 1
    } 
    if (count > 10){
      count = 10
    } 
    setItemCounter(count)
    setTotalPrice(
      item.sale ? 
      (item.price * count) - ((item.price * count) * item.salePercent / 100)  
      : 
      item.price * count
      )
    let updatingItem = getLoggedUser()
    let newShoppingCart = updatingItem.shoppingCart.map((el) => {
      if (el.id === item.id) {
        el.count = count < 1 ? count = 1 : count && count > 10 ? count = 10 : count
        return el
      } else {
        return el
      }
    })
    updatingItem.shoppingCart = newShoppingCart
    localStorage.setItem('loggedUser', JSON.stringify(updatingItem))
    dispatch(setUserAction(updatingItem))
  }

  function deleteItem(){
    let user = getLoggedUser()
    let newShoppingCart = user.shoppingCart.filter(el => el.id !== item.id)
    user.shoppingCart = newShoppingCart
    localStorage.setItem('loggedUser', JSON.stringify(user))
    changeStatus(user)
    dispatch(setUserAction(user))
  }

  useEffect(() => {
    if (item.sale) {
      setTotalPrice(item.price * item.count - (item.price * item.count * item.salePercent) / 100
      );
    } else {
      setTotalPrice(item.price * item.count)
    }
  }, [item]);

  return (
    <tr>
        <td><img src={images[item.img]} alt="item img" width="150px" height="150px"/>{item.title}</td>
        <td>{item.price}</td>
        <td><p className={styles.percent}>{item.sale ? -item.salePercent + "%" : "-"}</p></td>
        <td><input type="text" value={itemCounter} onChange={(e) => setCount(e)} onBlur={(e) => validateCount(e)}/></td>
        <td>${totalPrice}</td>
        <td><img src={images['deleteButton']} alt="delete" width='35px' onClick={deleteItem}/></td>
    </tr>
  )
}
