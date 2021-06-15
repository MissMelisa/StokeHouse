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
  button: { margin: "20px" },
  titleDialog: { alignSelf: "center", fontSize: "20px", fontWeight: "bolder" },
});

function Cart({ open, setOpen, cart, quantity, setQuantity }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(true);
  };

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
          setQuantity={setQuantity}
          nameItem={item.nameItem}
          image={item.image}
          quantity={item.quantity}
          price={item.selectedSize.price}
          size={item.selectedSize.size}
          excludedItems={item.excludedItems}
        />
      ))}
      <Button color="primary" variant="contained" className={classes.button}>
        Terminar comprar
      </Button>
    </Drawer>
  );
}
export default Cart;
