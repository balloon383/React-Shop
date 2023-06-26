import React, { useState } from "react";
import { getUsers, changeStatus } from "../../../api";
import { Navigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../../redux/actions/userActions";
import styles from "./Inputs.module.css"
 import { Formik } from "formik";



export default function LoginInputs() {
  const [redirect, setRedirect] = useState('')
  const dispatch = useDispatch()

  async function checkUser(email, password) {
    let usersArr = await getUsers();
    let errors = {}
    const userCheck = usersArr.find((el) => el.email === email);
    if (!userCheck) {
        errors.email = "Invalid email address"
        return errors
      }
      
    if (userCheck.password !== password) {
        errors.password = <p>Invalid password</p>
        return errors
      }
      
    const user = await changeStatus(userCheck, "true");
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({
        email: user.email,
        id: user.id,
        name: user.name,
        orders: user.orders,
        shoppingCart: user.shoppingCart,
        status: user.status,
      })
    );
    dispatch(setUserAction(user));
    setRedirect('true')
    return {}
  }

  if (redirect === 'true') {
      return <Navigate to='/'/>
  } 
  

  return (
    <Box className={styles.login__container}>
      <Typography variant="h4" className={styles.header}>
        Secure Sign In
      </Typography>
      <Typography variant="h5" className={styles.comment}>
        For current customers
      </Typography>
      <Box>
        <Formik
          initialValues={{ email: "", password: "" }}
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

            if(Object.keys(errors).length === 0){
                let loginValidation = await checkUser(values.email, values.password)
                errors = loginValidation
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                onClick={handleSubmit}
                className={styles.button}
              >
                Log In
              </button>
            </form>
          )}
        </Formik>
      </Box>
      
    </Box>
  );
}
