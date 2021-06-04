import { useState } from "react";

import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

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
    flexDirection: "column",
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
    margin: "20px",
  },
  spanIngredients: {
    color: "#525f7f",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
  },
  data: {
    display: "flex",
    borderTop: "1px solid #d2d6dc",
    backgroundColor: "#f4f5f7 !important",
  },
  span: { padding: "30px", display: "flex", flexDirection: "column" },
  checkbox: {
    display: "flex",
    alignItems: "center",
  },
  size: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  spanTitle: {
    alignSelf: "flex-start",
    fontSize: "15px",
    fontWeight: "bolder",
    marginBottom: "6px",
  },
  title: { display: "flex", alignItems: "center", flexDirection: "column" },
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
  const [selected, setSelected] = useState();

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
    setSelected(selected);
  }

  function handleOnClickAdd() {
    const orderItem = { nameItem, selected, excludedItems };
    onClickAddItem(orderItem);
  }
  console.log(ingredients, "lll");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.modal}
      maxWidth="lg"
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
          <img src={image} alt={nameItem} className={classes.image} />
          <div className={classes.span}>
            <div className={classes.extras}>
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
              <div className={classes.size}>
                <span className={classes.spanTitle}>Tamaño</span>
                <ButtonGroup
                  size="large"
                  color="primary"
                  aria-label="large outlined primary button group"
                >
                  {Object.keys(sizes).map((size) => (
                    <Button
                      onClick={() => handleOnClickSelected(size)}
                      color={size === selected && "secondary"}
                    >
                      {size}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button variant="contained" color="primary" onClick={handleOnClickAdd}>
          Agregar
        </Button>
      </div>
    </Dialog>
  );
}

export default CardItem;
