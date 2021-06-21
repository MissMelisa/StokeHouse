import { Button, Drawer, Typography } from "@material-ui/core";
import OrderItem from "../OrderItem";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  drawer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    maxWidth: "400px",
  },
  paperAnchorRight: { width: "100%", maxWidth: "400px" },

  button: { margin: "20px", cursor: "pointer" },
  total: {
    border: "1px solid #d2d6dc ",
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    fontWeight: "bolder",
    margin: "16px",
    justifyContent: "center",
  },
  titleDialog: { alignSelf: "center", fontSize: "20px", fontWeight: "bolder" },
});

function Cart({
  open,
  setOpen,
  cart,
  updateQuantity,
  handleOnDelete,
  subTotal,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(true);
  };

  function handleOnClickFinishedBuying() {}

  console.log(cart);
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
      <Typography className={classes.titleDialog}>Tu compra</Typography>
      {cart.map((item) => (
        <OrderItem
          updateQuantity={updateQuantity}
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
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={handleOnClickFinishedBuying}
      >
        Terminar comprar
      </Button>
    </Drawer>
  );
}
export default Cart;
