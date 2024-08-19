import React from "react";
import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowCart={props.onShowCart}/>
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="Delicious foods" />
      </div>
    </>
  );
};

export default Header;
