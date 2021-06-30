import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  containerItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    cursor: "pointer",
    marginBottom: "15px",
  },
  itemName: {
    fontSize: "25px",
    fontWeight: "bolder",
    marginRight: "10px",
    alignSelf: "flex-start",
  },
  ingredients: {
    color: "grey",
    alignSelf: "center",
  },
  image: {
    width: "250px",
    height: "200px",
  },
  itemData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

function FoodItem({ image, itemName, ingredients, sizes, onClick, id }) {
  const classes = useStyles();
  const defaultSize = Object.values(sizes)[0];

  return (
    <div className={classes.containerItem}>
      <img
        src={image}
        alt={itemName}
        className={classes.image}
        onClick={onClick}
      />
      <div className={classes.itemData}>
        <Typography className={classes.itemName}>{itemName}</Typography>
        <Typography>${defaultSize}</Typography>
      </div>

      <Typography className={classes.ingredients}>
        {ingredients.length >= 30 ? (
          <Typography> {ingredients.substring(0, 30)}... </Typography>
        ) : (
          <Typography>{ingredients}</Typography>
        )}
      </Typography>
    </div>
  );
}

export default FoodItem;
