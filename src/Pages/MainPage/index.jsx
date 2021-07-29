import { useState } from "react";

import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import CardItem from "../../Components/CardItem";
import { Typography } from "@material-ui/core";
import FoodItem from "../../Components/FoodItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import Cart from "../../Components/Cart";
import { useCart } from "../../Components/context/cartContext";
import InstagramIcon from "@material-ui/icons/Instagram";
import categories from "../../menu.json";

const useStyles = makeStyles((theme) => ({
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
    display: "grid",
    placeItems: "center",
    position: "relative",
  },
  categoryTitle: {
    alignSelf: "flex-start",
    color: "#32325d",
    fontWeight: "bolder",
    fontSize: "30px",
    marginBottom: "15px",
    marginLeft: "10px",
  },
  button: {
    margin: "8px",
    minWidth: "100px",
  },
  cartButton: {
    [theme.breakpoints.down("sm")]: { display: "none" },
    color: "#5e72e4",
    position: "absolute",
    right: "24px",
    top: "24px",
  },
  restaurantName: { color: "#525f7f" },
  logo: { width: "360px", height: "300px", alignSelf: "center" },
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

  mainButton: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      overflow: "scroll",
      alignItems: "center",
      width: "100%",
    },
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(auto-fit,minmax(230px, 1fr))",
    padding: "0",
    margin: "0",
    listStyle: "none",
    alignItems: "center",
  },
  spanIcons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: "10px",
  },
}));

function MainPage() {
  const { cart, addNewItem, deleteItem, totalCartItem } = useCart();

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
  function handleOnReDirectInstagram() {
    window.location.href = "https://www.instagram.com/stokehouse.burger/";
  }
  return (
    <div className={classes.page}>
      <div className={classes.header}>
        <Button
          variant="outline"
          startIcon={<ShoppingCartIcon />}
          className={classes.cartButton}
          onClick={() => handleSetOpen("openCart")}
        >
          Mi orden
        </Button>

        <img className={classes.logo} alt="logo" src="Images/logo.jpg" />
        <Typography className={classes.businessName} variant="h2">
          Stoke House Burgers
        </Typography>
        <div className={classes.icons}>
          <span className={classes.spanIcons}>
            <QueryBuilderIcon />
            <Typography variant="h7">8 P.M. - 12 P.M.</Typography>
          </span>
          <span className={classes.spanIcons}>
            <PhoneAndroidIcon />
            <Typography variant="h7">11 7360-7946</Typography>
          </span>
          <span
            className={classes.spanIcons}
            onClick={handleOnReDirectInstagram}
          >
            <InstagramIcon />
            <Typography variant="h7">@stokehouse.burger</Typography>
          </span>
        </div>
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

      <Badge
        badgeContent={totalCartItem}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        color="secondary"
        className={classes.cart}
      >
        <ShoppingCartIcon
          onClick={() => handleSetOpen("openCart")}
          className={classes.cart}
        />
      </Badge>
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
