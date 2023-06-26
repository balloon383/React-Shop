import React, { useState } from "react";
import { getUsers, registration } from '../../../api'
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../../redux/actions/userActions";
import { Formik } from 'formik';
import styles from "./Register.module.css"

export default function Register() {

  const [redirect, setRedirect] = useState('')
  const dipatcher = useDispatch()
    

  async function registerUser(name, email, password) {
    let usersArr = await getUsers();
    let newUser = {};
    let errors = {}
    for (let i = 0; i < usersArr.length; i++) {
      if (email === usersArr[i].email) {
        errors.email = 'User Already exist'
        return errors;
      } else {
        newUser = {
          name: name,
          email: email,
          password: password,
          status: true,
        };
      }
    }

    let registeredUser = await registration(newUser);
    newUser = { ...registeredUser };
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({
        email: newUser.email,
        id: newUser.id,
        name: newUser.name,
        orders: newUser.orders,
        shoppingCart: newUser.shoppingCart,
        status: newUser.status,
      })
    );
    dipatcher(setUserAction(newUser))
    setRedirect('true') 
  }

    if (redirect === 'true') {
      return <Navigate to='/'/>
  } 
  

  return (
    <Box className={styles.register__container}>
      <Typography variant="h4" className={styles.header}>
        Quick Registration
      </Typography>
      <Typography
        variant="h5"
        className={styles.comment}
      >
        For new customers
      </Typography>
      
      <Box>
        <Formik
          initialValues={{ name: "", email: "", password: "", passwordVerify: "" }}
          validateOnChange={false}
          validateOnBlur={false}
          validate={async (values) => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (values.password !== values.passwordVerify) {
              errors.password = "Password not matches";
            } else if (values.password.length < 3) {
              errors.password = "Password too short";
            }

            if(Object.keys(errors).length === 0){
              let validationErrors = await registerUser(
                values.name,
                values.email,
                values.password,
              )
              errors = validationErrors
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={styles.input}
                placeholder="Name"
              />
              {errors.name && touched.name && errors.name}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={styles.input}
                placeholder="Email Address"
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={styles.input}
                placeholder="Password"
              />
              {errors.password && touched.password && errors.password}
              <input
                type="password"
                name="passwordVerify"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordVerify}
                className={styles.input}
                placeholder="Password Verify"
              />
              {errors.passwordVerify &&
                touched.passwordVerify &&
                errors.passwordVerify}
              <button
                type="submit"
                onClick={handleSubmit}
                className={styles.button}
              >
                Create Account
              </button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}