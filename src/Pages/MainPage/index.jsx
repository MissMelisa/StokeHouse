import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import FoodItem from "../../Components/FoodItem";
import CardItem from "../../Components/CardItem";

import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const categories = [
  {
    name: "Burgers",
    items: [
      {
        name: "Cheeseburger",
        image: "Images/cheeseburger.jpeg",
        ingredients: ["pan", "carne 125gr", "papas fritas"],
        sizes: { simple: "$390", Doble: "$470", Triples: "$550" },
      },
      {
        name: "Classic",
        image: "Images/classic.jpeg",
        ingredients: [
          "pan",
          "carne 125gr",
          "creddar",
          "tomate",
          "lechuga",
          "cebolla",
          "papas fritas",
        ],
        sizes: { simple: "$410", Doble: "$490" },
      },
      {
        name: "Sweetmeat",
        image: "Images/sweetmeat.jpg",
        ingredients: [
          "pan",
          "carne 125gr",
          "cebolla caramelizada",
          "cheddar",
          "papas fritas",
        ],
        sizes: { simple: "$400", doble: "$480", triples: "$560" },
      },
      {
        name: "Veggie",
        image: "https://www.hazteveg.com/img/recipes/full/201204/R21-31659.jpg",
        ingredients: [
          "pan",
          "medallon de lenteja",
          "tomate",
          "lechuga",
          "papas fritas",
        ],
        sizes: { simple: "$400", doble: "$480" },
      },
      {
        name: "Grilled onion",
        image:
          "https://grandwichacasa.com.ar/wp-content/uploads/2020/05/burguer-con-cheddar.jpg",
        ingredients: [
          "pan",
          "carne 125gr",
          "cheddar",
          "bacon",
          "cebolla grillada",
          "papas fritas",
        ],
        sizes: { simple: "$430", doble: "$510", triples: "$590" },
      },
      {
        name: "Bully burger",
        image:
          "https://media-cdn.tripadvisor.com/media/photo-s/0e/40/91/8b/hamburguesa-con-queso.jpg",
        ingredients: [
          "pan",
          "carne 125gr",
          "cheddar",
          "huevo",
          "cebolla caramelizada",
          "bacon barbacoa",
          "papas fritas",
        ],
        sizes: { simple: "$490", doble: "$580", triples: "$660" },
      },
    ],
  },
  { name: "ensaladas", items: [] },
  {
    name: "Porciones",
    items: [
      {
        name: "Papas fritas",
        image: "Images/porcionpapas.jpg",
        ingredients: ["papas", "sal"],
        sizes: { L: "$170", XL: "$200" },
      },
      {
        name: "Batatas fritas",
        image:
          "https://static.paraloscuriosos.com/img/articles/4957/800x800/5774ea13e10d9_miniaturka.jpg",
        ingredients: ["batatas", "sal"],
        sizes: { L: "$220", XL: "$250" },
      },
      {
        name: "Espiral de papas",
        image:
          "https://www.paulinacocina.net/wp-content/uploads/2016/03/vlcsnap-2016-03-14-13h07m45s251-1-e1457972681209.jpg",
        ingredients: ["papas", "sal"],
        sizes: {
          unidad: "$80",
          X2: "$150",
          X3: "$210",
          X4: "$260",
          X5: "$300",
        },
      },
    ],
  },
];

const useStyles = makeStyles({
  dishes: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  categoryTitle: {
    alignSelf: "flex-start",
    marginLeft: "30px",

    color: "#32325d",
    fontWeight: "bolder",
    fontSize: "30px",
  },
  button: {
    margin: "8px",
  },
  restaurantName: { color: "#525f7f" },
  logo: { width: "400px", height: "300px" },
  containerCategory: { width: "100%" },
});

function MainPage() {
  const classes = useStyles();

  const [filter, setFilter] = useState();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState();

  function handleOnClick(item) {
    setOpen(true);
    setDetail(item);
  }

  function handleOnClickFilter(value) {
    setFilter(value);
  }

  return (
    <div className={classes.page}>
      <img
        className={classes.logo}
        alt="logo"
        src="https://i.pinimg.com/originals/e2/98/11/e29811d3411c6696130a123c32727d9a.jpg"
      />
      <Typography> Stoke House Burgers</Typography>
      <span>
        <QueryBuilderIcon />
        <span>8 P.M. - 12 P.M.</span>
        <PhoneAndroidIcon />
        <span> 11 7360-7946</span>
      </span>
      <div>
        <Button
          variant={filter ? "outlined" : "contained"}
          className={classes.button}
          color="primary"
          onClick={() => handleOnClickFilter()}
        >
          Todas las categorias
        </Button>
        <div>
          {categories.map((category) => (
            <Button
              variant={filter === category.name ? "contained" : "outlined"}
              className={classes.button}
              color="primary"
              onClick={() => handleOnClickFilter(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className={classes.containerCategory}>
        {categories
          .filter((category) => !filter || (filter && category.name === filter))
          .map((category) => (
            <div className={classes.category}>
              <Typography className={classes.categoryTitle}>
                {category.name}
              </Typography>
              <div className={classes.dishes}>
                {category.items.map((item) => (
                  <FoodItem
                    image={item.image}
                    itemName={item.name}
                    ingredients={
                      !!item.ingredients ? item.ingredients.join() : ""
                    }
                    sizes={item.sizes}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
      <div>
        {detail && (
          <CardItem
            open={open}
            setOpen={setOpen}
            image={detail.image}
            nameItem={detail.name}
            ingredients={detail.ingredients}
            sizes={detail.sizes}
            onClickAddItem={alert}
          />
        )}
      </div>
    </div>
  );
}
export default MainPage;
