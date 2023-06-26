import React from 'react'
import styles from './Login.module.css'
import LoginInputs from './loginInputs/LoginInputs'
import Register from './register/Register'
import Box from "@mui/material/Box";

export default function Login() {
  return (
    <Box>
      <Box className={styles.main__login}>
        <LoginInputs />
        <Register />
      </Box>
    </Box>
  );
}
