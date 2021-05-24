import { Button, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  modal: {
    width: "100%",
    height: "100%",
    border: "0 solid #d2d6dc",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    margin: "20px",
    width: "250px",
    height: "300px",
    alignSelf: "flex-start",
  },
  modalData: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nameItem: {
    fontSize: "25px",
    fontWeight: "bolder",
    alignSelf: "flex-start",
    margin: "20px",
  },
  itemDetails: {
    color: "#525f7f",
  },
  data: {
    display: "flex",
    borderTop: "1px solid #d2d6dc",
    backgroundColor: "#f4f5f7 !important",
  },
  span: { padding: "30px", display: "flex", flexDirection: "column" },
});

function CardItem({ open, setOpen, image, price, ingredients, nameItem }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.modalData}>
        <Typography className={classes.nameItem}>{nameItem}</Typography>
        <div className={classes.data}>
          <img src={image} alt={nameItem} className={classes.image} />
          <div className={classes.span}>
            <span className={classes.itemDetails}>Simple: {price}</span>
            <span className={classes.itemDetails}>{ingredients}</span>
          </div>
        </div>
        <Button variant="contained" color="primary">
          Agregar
        </Button>
      </div>
    </Modal>
  );
}

export default CardItem;
