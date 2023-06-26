import React, { useEffect, useState, useCallback } from "react";
import styles from "./CardStyle.module.css";
import { getLoggedUser, changeStatus, getUsers } from "../../../../api";
import images from "../../../../images";
import { Navigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../../../redux/actions/userActions";

export default function Card({ product }) {
  const [cartStyle, setCartStyle] = useState('primary')
  const [redirect, setRedirect] = useState("");
  const dispatcher = useDispatch()

  const checkButtonStatus = useCallback(() => {
    let shoppingCart = getLoggedUser().shoppingCart || [];
    if (shoppingCart.length > 0) {
      for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].id === product.id) {
          setCartStyle("secondary");
        }
      }
    }
  }, [product.id]);

  useEffect(() => {
      checkButtonStatus();
  }, [checkButtonStatus]);
  
  function toCart() {
    let user = getLoggedUser();
    if (user.length === 0) {
      setRedirect("false");
    } else {
      if (cartStyle === "primary") {
        setCartStyle("secondary");
        addToCart();
      } else {
        setCartStyle("primary");
        removeFromCart();
      }
      setRedirect("true");
    }
  }

  async function addToCart() {
    let localUser = getLoggedUser();
    let dataToUpdate = {
      ...localUser,
      shoppingCart: [{ id: product.id, count: 1 }, ...localUser.shoppingCart],
    };
    const userUpdated = await changeStatus(dataToUpdate);
    localStorage.setItem("loggedUser", JSON.stringify(userUpdated));
    dispatcher(setUserAction(userUpdated))
  }
  
  async function removeFromCart() {
    let localUser = getLoggedUser();
    let store = await getUsers(localUser.id);
    let updatedStore = store.shoppingCart.filter((el) => el.id !== product.id);
    store.shoppingCart = updatedStore;
    await changeStatus(store);
    localStorage.setItem("loggedUser", JSON.stringify(store));
    dispatcher(setUserAction(store))
  }

  if (redirect === "false") {
    return <Navigate to="/login" />;
  }

  return (
    <Box className={styles.card}>
      <img
        src={images[product.img]}
        className="card__img"
        alt="card Img"
        width="150px"
      />
      <Typography variant="h5" className={styles.card__header}>
        {product.title}
      </Typography>
      <List className={styles.card__ul}>
        <ListItem className={styles.card__li}>
          {product.sale ? (
            <List>
              <ListItem className={styles.price_prev} disablePadding >
                ${product.price}
              </ListItem>
              <ListItem disablePadding>
                <Typography
                  variant="inherit"
                  className={styles.salePercent}
                >
                  {" "}
                  -{product.salePercent}%
                </Typography>
              </ListItem>
              <ListItem className={styles.price}>
                ${product.price - (product.price * product.salePercent) / 100}
              </ListItem>
            </List>
          ) : (
            <Typography variant="inherit" className={styles.price}>
              ${product.price}
            </Typography>
          )}
        </ListItem>
        <ListItem className={styles.card__li}>
          <IconButton
            color={cartStyle}
            aria-label="add to shopping cart"
            onClick={toCart}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );
}
