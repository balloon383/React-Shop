import React, { useEffect } from 'react'
import './App.css';
import Login from './pages/login/Login';
import { MainPage } from './pages/mainPage/MainPage'
import User from './pages/user/User'
import ShoppingCart from './pages/shoppingCart/ShoppingCart'
import Header from './components/header/Index';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/hoc/PrivateRoute';
import Box from "@mui/material/Box";
import { useDispatch } from 'react-redux';
import {
  getUserThunk,
} from "./redux/actions/userActions";
import { getLoggedUser } from './api';
export default function App() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    let localUser = getLoggedUser();
    if (localUser.status) {
      dispatch(getUserThunk(localUser.id));
    }
    
  }, [dispatch]);

  return (
      <Box className='App'>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />
            <Route
              path="/shoppingCart"
              element={
                <PrivateRoute >
                  <ShoppingCart />
                </PrivateRoute>
              }
            />
          </Routes>
      </Box>
  );
  
}