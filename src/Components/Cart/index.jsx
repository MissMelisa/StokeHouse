import { Button, Drawer, Typography } from "@material-ui/core";
import OrderItem from "../OrderItem";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";

import { useCart } from "../context/cartContext";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    maxWidth: "400px",
  },
  paperAnchorRight: { width: "100%", maxWidth: "400px" },

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
    alignSelf: "flex-end",
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
});

function Cart({ open, setOpen, handleOnDelete, subTotal }) {
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
        {cart.reduce((subTotal, cart) => {
          subTotal = subTotal + cart.quantity * cart.selectedSize.price;
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
    </Drawer>
  );
}
export default Cart;
