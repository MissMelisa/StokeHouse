import { useState } from "react";

import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles({
  modal: {
    border: "0 solid #d2d6dc",
    backgroundColor: "white",
    padding: "20px",
  },
  containerImage: {
    justifyContent: "center",
    display: "flex",
  },
  image: {
    margin: "20px",
    width: "250px",
    height: "300px",
  },
  modalData: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: "700px",
    height: "100%",
  },
  nameItem: {
    fontSize: "25px",
    fontWeight: "bolder",
    alignSelf: "flex-start",
    margin: "20px",
  },
  itemDetails: {
    color: "#525f7f",
    margin: "20px",
  },
  spanIngredients: {
    color: "#525f7f",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  data: {
    display: "grid",
    backgroundColor: "#f4f5f7 !important",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    width: "100%",
  },
  span: {
    padding: "30px",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
  },
  size: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  spanTitle: {
    alignSelf: "flex-start",
    fontSize: "15px",
    fontWeight: "bolder",
    marginBottom: "6px",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "10px",
  },
  inputNumber: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

function CardItem({
  open,
  setOpen,
  image,
  sizes,
  ingredients,
  nameItem,
  onClickAddItem,
}) {
  const classes = useStyles();

  const [excludedItems, setExludedItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    if (event.target.checked) {
      setExludedItems([...excludedItems, event.target.name]);
    } else {
      const newArray = excludedItems.filter((ingredient) => {
        return ingredient !== event.target.name;
      });
      setExludedItems(newArray);
    }
  };

  function handleOnClickSelected(selected) {
    const [size, price] = selected;
    setSelectedSize({ size, price });
  }

  function handleOnClickAdd() {
    const orderItem = {
      nameItem,
      selectedSize,
      excludedItems,
      image,
      quantity,
    };

    onClickAddItem(orderItem);
    setOpen(false);
    setExludedItems([]);
    setSelectedSize({});
  }
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  function handleOnChangeQuantity(ev) {
    setQuantity(parseInt(ev.target.value));
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.modal}
      fullScreen={fullScreen}
    >
      <div className={classes.modalData}>
        <div className={classes.title}>
          <Typography className={classes.nameItem}>{nameItem}</Typography>
          <span className={classes.spanTitle}>Ingredientes </span>
          <span className={classes.spanIngredients}>
            {!!ingredients ? ingredients.join() : ""}
          </span>
        </div>
        <div className={classes.data}>
          <span className={classes.containerImage}>
            <img src={image} alt={nameItem} className={classes.image} />
          </span>

          <div className={classes.span}>
            <div className={classes.data}>
              <span className={classes.spanTitle}>Excluir</span>
              {ingredients.map((ingredient) => (
                <div className={classes.checkbox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={ingredient}
                        checked={excludedItems.includes(ingredient)}
                        onChange={handleChange}
                      />
                    }
                    label={ingredient}
                  />
                </div>
              ))}
            </div>

            <div className={classes.size}>
              <span className={classes.spanTitle}>Tamaño</span>
              <ButtonGroup
                size="large"
                color="default"
                aria-label="large outlined primary button group"
              >
                {Object.entries(sizes).map((size) => {
                  const [key, value] = size;
                  return (
                    <Button
                      onClick={() => handleOnClickSelected(size)}
                      color={key === selectedSize.size && "primary"}
                    >
                      {key}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </div>

            <TextField
              type="number"
              label="Cantidad"
              onChange={handleOnChangeQuantity}
              defaultValue={1}
            />
          </div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleOnClickAdd}
            size="medium"
          >
            Agregar
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default CardItem;
