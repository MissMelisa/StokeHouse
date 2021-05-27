import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  containerItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    margin: "30px",
  },
  itemName: {
    fontSize: "1rem",
    fontWeight: "bolder",
    fontFamily: "Open Sans,sans-serif",
    marginTop: "10px",
  },
  ingredients: {
    color: "grey",
    alignSelf: "flex-start",
  },
  image: {
    width: "250px",
    height: "200px",
  },
});

function FoodItem({ image, itemName, ingredients, price }) {
  const classes = useStyles();

  return (
    <div className={classes.containerItem}>
      <img src={image} alt={itemName} className={classes.image} />
      <span className={classes.itemName}>{itemName}</span>
      <span className={classes.ingredients}>
        {ingredients.length >= 30 ? (
          <span> {ingredients.substring(0, 30)}... </span>
        ) : (
          <span>{ingredients}</span>
        )}
      </span>
      <span>{price}</span>
    </div>
  );
}

export default FoodItem;
