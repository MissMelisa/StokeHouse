import { Button, Drawer, Typography } from "@material-ui/core";
import OrderItem from "../OrderItem";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

import { useCart } from "../context/cartContext";

import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  drawer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    maxWidth: "400px",
  },
  paperAnchorRight: {
    width: "100%",
    maxWidth: "400px",
    alignItems: "center",
  },

  button: { marginBottom: "15px" },
  total: {
    border: "1px solid #d2d6dc ",
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    fontWeight: "bolder",
    margin: "16px",
    justifyContent: "center",
  },
  cartButton: {
    display: "flex",
    alignSelf: "flex-start",
    justifyContent: "center",
    margin: "16px",
    cursor: "pointer",
  },
  buttonsDrawer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  titleDialog: { alignSelf: "center", fontSize: "20px", fontWeight: "bolder" },
  emptyContainer: {
    border: "1px solid black",
    maxWidth: "300px",
    width: "100%",
    maxHeight: "250px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    margin: "20px",
  },
  containerOrderItem: { overflow: "scroll" },
});

function Cart({ open, setOpen, handleOnDelete }) {
  const classes = useStyles();
  const { cart, updateItemQuantity } = useCart();

  let history = useHistory();

  const handleClose = () => {
    setOpen(true);
  };

  function handleOnClickFinishedBuying() {
    return history.push("/checkout");
  }

  return (
    <Drawer
      anchor="right"
      className={classes.drawer}
      classes={{ paperAnchorRight: classes.paperAnchorRight }}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="lg"
    >
      <ClearIcon className={classes.cartButton} onClick={handleClose} />

      <Typography className={classes.titleDialog}>Tu compra</Typography>
      {cart.length >= 1 ? (
        <div className={classes.containerOrderItem}>
          {cart.map((item) => (
            <OrderItem
              updateQuantity={updateItemQuantity}
              handleOnDelete={handleOnDelete}
              nameItem={item.nameItem}
              id={item.id}
              image={item.image}
              quantity={item.quantity}
              price={item.selectedSize.price}
              size={item.selectedSize.size}
              excludedItems={item.excludedItems}
            />
          ))}
          <Typography className={classes.total}>
            Total: $
            {cart.reduce((subTotal, cartItem) => {
              subTotal =
                subTotal + cartItem.quantity * cartItem.selectedSize.price;
              return subTotal;
            }, 0)}
          </Typography>
          <div className={classes.buttonsDrawer}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={handleOnClickFinishedBuying}
            >
              Finalizar tu pedido
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={handleClose}
            >
              Seguir comprando
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.emptyContainer}>
          <SentimentVeryDissatisfiedIcon color="primary" fontSize="large" />
          <Typography variant="h5">Tu carrito esta vacio</Typography>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={handleClose}
          >
            Seguir comprando
          </Button>
        </div>
      )}
    </Drawer>
  );
}

Cart.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleOnDelete: PropTypes.func.isRequired,
};
export default Cart;
