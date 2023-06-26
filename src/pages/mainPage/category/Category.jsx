import React from 'react'
import Card from './card/Card'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography";
import styles from './Category.module.css'

export default function Category({productsArr, title}) {
      
  
    return (
      <Container className={styles.content__container}>
        <Typography variant="h4">{title}</Typography>
        <Box className={styles.card__box}>
          {productsArr.map((el) => (
            <Card product={el} key={el.id} />
          ))}
        </Box>
      </Container>
    );
}
