import { Button, ButtonGroup, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  image: { width: "200px", height: "150px" },
  itemData: { fontSize: "15px" },
  orderItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    maxHeight: "1000px",
  },
});

function OrderItem({
  nameItem,
  id,
  excludedItems,
  image,
  price,
  subTotal,
  size,
  quantity,
  updateQuantity,
  handleOnDelete,
}) {
  const classes = useStyles();

  function handleOnClickAdd(newQuantity) {
    updateQuantity(newQuantity, id);
  }

  return (
    <>
      <div className={classes.orderItemContainer}>
        <img src={image} alt={nameItem} className={classes.image} />
        <Typography className={classes.itemData}>{nameItem}</Typography>
        <Typography className={classes.itemData}>{excludedItems}</Typography>
        <Typography className={classes.itemData}>{size}</Typography>
        <Typography>
          {quantity}X ${price * quantity}
        </Typography>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button onClick={() => handleOnClickAdd(1)}>
            <AddIcon />
          </Button>
          <Button onClick={() => handleOnClickAdd(-1)}>
            <RemoveIcon />
          </Button>
          <Button onClick={() => handleOnDelete(id)}>
            <DeleteForeverIcon />
          </Button>
        </ButtonGroup>

        <Typography className={classes.itemData}>{subTotal}</Typography>
      </div>
    </>
  );
}
export default OrderItem;
