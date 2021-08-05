import { useState } from "react";
import PropTypes from "prop-types";

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
import FoodItemOptions from "../FoodItemOptions";

const useStyles = makeStyles({
  modal: {
    border: "0 solid #d2d6dc",
    backgroundColor: "white",
    padding: "20px",
  },
  containerImage: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    margin: "20px",
    width: "250px",
    height: "300px",
    alignSelf: "center",
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
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    margin: "10px",
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
    margin: "6px",
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
  errorMessage: { color: "red" },
});

function CardItem({
  open,
  setOpen,
  image,
  sizes,
  description,
  nameItem,
  onClickAddItem,
  options,
  excludedItems,
  id,
}) {
  const classes = useStyles();
  const objectSizes = Object.entries(sizes);
  const [excludedIngredients, setExludedIngredients] = useState([]);
  const [selectedSize, setSelectedSize] = useState({
    size: objectSizes[0][0],
    price: objectSizes[0][1],
  });
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    if (event.target.checked) {
      setExludedIngredients([...excludedIngredients, event.target.name]);
    } else {
      const newArray = excludedIngredients.filter((ingredient) => {
        return ingredient !== event.target.name;
      });
      setExludedIngredients(newArray);
    }
  };

  function handleOnClickSelected(selected) {
    const [size, price] = selected;
    setError(false);

    setSelectedSize({ size, price });
  }

  function handleOnOptions(title, option) {
    setError(false);
    setSelectedOptions((prevState) => ({ ...prevState, [title]: option }));
  }
  console.log(selectedOptions);

  function handleOnClickAdd() {
    const orderItem = {
      nameItem,
      selectedSize,
      excludedItems: excludedIngredients,
      image,
      quantity,
      selectedOptions,
    };

    if (
      !selectedSize.size
      // !selectedOptions.pan &&
      // !selectedOptions.guarnicion
    ) {
      setError(true);
      return;
    }

    onClickAddItem(orderItem);
    setOpen(false);
    setExludedIngredients([]);
    setSelectedSize({});
    setSelectedOptions({});
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
        </div>
        <div className={classes.data}>
          <span className={classes.containerImage}>
            <span className={classes.spanTitle}>Ingredientes </span>
            <span className={classes.spanIngredients}>{description}</span>

            <img src={image} alt={nameItem} className={classes.image} />
          </span>

          <div className={classes.span}>
            <div className={classes.data}>
              {excludedItems.length >= 1 && (
                <span className={classes.spanTitle}>Excluir</span>
              )}

              {excludedItems.map((excludedItem) => (
                <div className={classes.checkbox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={excludedItems}
                        checked={excludedIngredients.includes(excludedItem)}
                        onChange={handleChange}
                      />
                    }
                    label={excludedItem}
                  />
                </div>
              ))}
            </div>
            {objectSizes.length > 1 && (
              <div className={classes.size}>
                <span className={classes.spanTitle}>Tamaño</span>
                <ButtonGroup
                  orientation="vertical"
                  variant="contained"
                  color="primary"
                  aria-label="vertical outlined primary button group"
                >
                  {objectSizes.map((size) => {
                    const [key, price] = size;

                    return (
                      <Button
                        onClick={() => handleOnClickSelected(size)}
                        color="primary"
                        variant={
                          key === selectedSize.size ? "contained" : "outline"
                        }
                      >
                        {key} $ {price}
                      </Button>
                    );
                  })}
                </ButtonGroup>
                {error === true && (
                  <span className={classes.errorMessage}>
                    Selecciona el tamaño
                  </span>
                )}
              </div>
            )}

            <div className={classes.size}>
              {Object.entries(options).map((option) => {
                const [title, values] = option;

                return (
                  <FoodItemOptions
                    error={error}
                    selectedOption={selectedOptions[title]}
                    title={title}
                    options={values}
                    onClick={handleOnOptions}
                  />
                );
              })}
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

CardItem.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  image: PropTypes.string,
  sizes: PropTypes.number,
  ingredients: PropTypes.string,
  nameItem: PropTypes.string.isRequired,
  onClickAddItem: PropTypes.func.isRequired,
};

export default CardItem;
