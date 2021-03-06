import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

function FoodItem({ image, itemName, description, sizes, onClick }) {
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
        <Typography>{description}</Typography>
      </Typography>
    </div>
  );
}

FoodItem.propTypes = {
  image: PropTypes.string,
  itemName: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  sizes: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

export default FoodItem;
