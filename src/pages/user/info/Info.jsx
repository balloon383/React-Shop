import React from 'react'
import "./style.css";
import deleteAccount, { getLoggedUser } from '../../../api';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../../redux/actions/userActions';

export default function Info() {

  const user = getLoggedUser()
  const dispatch = useDispatch()

  async function accountDeletion() {
    dispatch(setUserAction([]))
    localStorage.clear()
    await deleteAccount(user.id);
  }
  return (
    <section className="info__box">
      <h2 className="info__header">My Info</h2>
      <ul className="info__name--box">
        <li>Name:</li>
        <li>{user.name}</li>
      </ul>
      <ul className="info__email--box">
        <li>Email:</li>
        <li>{user.email}</li>
      </ul>
      <button className="info__button" onClick={accountDeletion}>Delete Account</button>
    </section>
  );
}
