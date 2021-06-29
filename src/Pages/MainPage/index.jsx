import { useState } from "react";

import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Button from "@material-ui/core/Button";
import CardItem from "../../Components/CardItem";
import { Typography } from "@material-ui/core";
import FoodItem from "../../Components/FoodItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import Cart from "../../Components/Cart";
import { useCart } from "../../Components/context/cartContext";

import categories from "../../menu.json";

// const MENU = JSON.parse(categories);

const useStyles = makeStyles({
  dishes: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
  categoryTitle: {
    alignSelf: "flex-start",
    marginLeft: "30px",
    color: "#32325d",
    fontWeight: "bolder",
    fontSize: "30px",
  },
  button: {
    margin: "8px",
  },
  cartButton: {
    color: "#5e72e4",
    display: "flex",
    alignSelf: "flex-end",
    margin: "16px",
    boxShadow: "5px grey",
  },
  restaurantName: { color: "#525f7f" },
  logo: { width: "320px", height: "300px" },
  containerCategory: { width: "100%" },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  businessName: {
    fontWeight: "bolder",
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cart: {
    bottom: "24px",
    right: "24px",
    boxShadow: "5px grey",
    position: "fixed",
    background: "#f5365c",
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    color: "white",
    padding: "12px",
    marginRight: "10px",
    cursor: "pointer",
  },
  buttonsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr ",
    alignItems: "center",
    justifyContent: "center",
  },
  mainButton: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  },
});

function MainPage() {
  const { cart, addNewItem, deleteItem } = useCart();

  const [open, setOpen] = useState({ openCart: false, openCartItem: false });
  const classes = useStyles();
  const [filter, setFilter] = useState();
  const [detail, setDetail] = useState();

  function handleOnClick(item) {
    handleSetOpen("openCartItem");
    setDetail(item);
  }

  function handleOnClickFilter(value) {
    setFilter(value);
  }

  function handleOnClickCart(orderItem) {
    addNewItem(orderItem);
    handleSetOpen("openCart");
  }

  function handleSetOpen(dialog) {
    setOpen((prevState) => {
      return { ...prevState, [dialog]: !prevState[dialog] };
    });
  }

  return (
    <div className={classes.page}>
      <Button
        variant="outline"
        startIcon={<ShoppingCartIcon />}
        className={classes.cartButton}
        onClick={() => handleSetOpen("openCart")}
      >
        Mi orden
      </Button>
      <div className={classes.header}>
        <img className={classes.logo} alt="logo" src="Images/logo.jpg" />
        <Typography className={classes.businessName}>
          Stoke House Burgers
        </Typography>
        <span>
          <QueryBuilderIcon />
          <span>8 P.M. - 12 P.M.</span>
          <PhoneAndroidIcon />
          <span> 11 7360-7946</span>
        </span>
      </div>

      <div className={classes.mainButton}>
        <Button
          variant={filter ? "outlined" : "contained"}
          className={classes.button}
          color="primary"
          onClick={() => handleOnClickFilter()}
        >
          Todas las categorias
        </Button>
        <div className={classes.buttonsContainer}>
          {categories.map((category) => (
            <Button
              variant={filter === category.name ? "contained" : "outlined"}
              className={classes.button}
              color="primary"
              onClick={() => handleOnClickFilter(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      <ShoppingCartIcon
        onClick={() => handleSetOpen("openCart")}
        className={classes.cart}
      />
      <div className={classes.containerCategory}>
        {categories
          .filter((category) => !filter || (filter && category.name === filter))
          .map((category) => (
            <div className={classes.category}>
              <Typography className={classes.categoryTitle}>
                {category.name}
              </Typography>
              <div className={classes.dishes}>
                {category.items.map((item) => (
                  <FoodItem
                    onClick={() => handleOnClick(item)}
                    image={item.image}
                    itemName={item.name}
                    ingredients={
                      !!item.ingredients ? item.ingredients.join() : ""
                    }
                    sizes={item.sizes}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
      <div>
        {detail && (
          <CardItem
            open={open.openCartItem}
            setOpen={() => handleSetOpen("openCartItem")}
            image={detail.image}
            nameItem={detail.name}
            ingredients={detail.ingredients}
            sizes={detail.sizes}
            onClickAddItem={handleOnClickCart}
          />
        )}
      </div>
      {cart && (
        <Cart
          open={open.openCart}
          setOpen={() => handleSetOpen("openCart")}
          handleOnDelete={deleteItem}
        />
      )}
    </div>
  );
}
export default MainPage;
