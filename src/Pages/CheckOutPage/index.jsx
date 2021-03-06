import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useState } from "react";
import { useCart } from "../../Components/context/cartContext";
import OrderItem from "../../Components/OrderItem";

const useStyles = makeStyles({
  checkoutPageContainer: {
    display: "grid",
    gap: "40px",
    marginTop: "40px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "40px",
    marginRight: "40px",
  },
  containerLogo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: "320px", height: "300px" },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "400px",
    height: "100%",
    maxHeight: "150px",
    margin: "20px",
    fontSize: "25px",
    color: "#32325d",
  },
  paperScroll: {
    width: "100%",
    minWidth: "250px",
    height: "100%",
    maxHeight: "400px",
    margin: "20px",
    fontSize: "25px",
    color: "#32325d",
    overflow: "scroll",
  },
  textField: {
    maxWidth: "250px",
    width: "100%",
  },
  total: {
    border: "1px solid #d2d6dc ",
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontWeight: "bolder",
    padding: "15px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  sendWhatsApp: {
    cursor: "pointer",
    color: "white",
    backgroundColor: "#2dce89",
    marginLeft: "25px",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#2dce89",
    },
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minWidth: "500px",
    height: "100%",
    maxHeight: "500px",
    marginLeft: "20px",
  },
  typography: {
    marginTop: "25px",
    marginBottom: "5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  label: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bolder",
  },
  businessName: {
    fontWeight: "bolder",
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  delivery: {
    color: "red",
  },
});

function CheckOutPage() {
  const { cart, updateItemQuantity, handleOnDelete } = useCart();
  const [order, setOrder] = useState({
    name: "",
    address: "",
    cash: "",
    comments: "",
    total: "",
  });
  const total = cart.reduce((subTotal, cartItem) => {
    subTotal = subTotal + cartItem.quantity * cartItem.selectedSize.price;
    return subTotal;
  }, 0);
  const classes = useStyles();

  function handleOnChangeOrder(ev) {
    setOrder((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    let intro = "Hola,me gustaria realizar una orden ???????????? :  ";

    cart.forEach((item) => {
      intro += `${item.quantity} ${item.nameItem} ${
        item.selectedSize.size
      } : ${Object.values(item.selectedOptions)}\n`;

      // intro -> hola, me gustaria realizar una orden + 4 cheeseburger XL, 2 big mac M

      if (item.excludedItems.length >= 1)
        // hola, me gustaria realizar una orden 4 cheeseburger XL, 2 big mac M + sin pepino
        intro += ` sin ${item.excludedItems.join()} \n`;
    });
    const itemsTotal = total;
    const dataClient = `????  *Datos del cliente* \n Mi nombre es: ${order.name}\n Direccion: ${order.address}\n????Abonare con: $ ${order.cash}\n????Comentario: ${order.comments} \n Total: $ `;
    const finalMessage = encodeURIComponent(
      `${intro}${dataClient}${itemsTotal}`
    );
    window.location.href = `https://wa.me/5491173607946?text=${finalMessage}`;
  }

  return (
    <div>
      <div className={classes.containerLogo}>
        <img className={classes.logo} alt="logo" src="Images/logo.jpg" />
        <Typography
          color="black"
          variant="h2"
          className={classes.businessName}
          align="center"
        >
          Stoke House Burgers
        </Typography>
      </div>

      <form className={classes.checkoutPageContainer} onSubmit={handleOnSubmit}>
        <Paper className={classes.paperScroll} square>
          <Typography color="black" variant="h5" className={classes.typography}>
            Tu pedido
          </Typography>
          {cart.map((item) => (
            <OrderItem
              key={item.id}
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
        </Paper>
        <Paper elevation={3} variant="elevation" className={classes.paper}>
          <label className={classes.label} htmlFor="name">
            Tu nombre
          </label>
          <TextField
            required
            onChange={handleOnChangeOrder}
            id="name"
            name="name"
            autoFocus="true"
            className={classes.textField}
          />
        </Paper>

        <Paper elevation={3} variant="elevation" className={classes.paper}>
          <label htmlFor="address" className={classes.label}>
            Direccion de entrega
          </label>

          <TextField
            required
            name="address"
            id="address"
            className={classes.textField}
            onChange={handleOnChangeOrder}
          />
        </Paper>
        <Paper elevation={3} variant="elevation" className={classes.paper}>
          <label htmlFor="cash" className={classes.label}>
            Abona con...
          </label>
          <TextField
            required
            name="cash"
            id="cash"
            className={classes.textField}
            onChange={handleOnChangeOrder}
          />
        </Paper>
        <Paper elevation={3} variant="elevation" className={classes.paper}>
          <label htmlFor="comments" className={classes.label}>
            Comentarios
          </label>
          <TextField
            name="comments"
            className={classes.textField}
            multiline={true}
            id="comments"
            onChange={handleOnChangeOrder}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Paper>

        <Paper
          elevation={3}
          variant="elevation"
          className={classes.paperScroll}
        >
          <Typography
            color="textSecundary"
            variant="h5"
            className={classes.typography}
          >
            Finalizar tu pedido
          </Typography>

          <span className={classes.total}>
            Total: $
            {cart.reduce((subTotal, cart) => {
              subTotal = subTotal + cart.quantity * cart.selectedSize.price;
              return subTotal;
            }, 0)}
            <Typography variant="subtitle2" className={classes.delivery}>
              *el precio es sin costo de envio
            </Typography>
          </span>
          <Button type="submit" className={classes.sendWhatsApp} size="medium">
            <Typography>Enviar pedido por WhatsApp</Typography>
          </Button>
        </Paper>
      </form>
    </div>
  );
}

export default CheckOutPage;
