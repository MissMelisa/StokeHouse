import { useState } from "react";

import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Button from "@material-ui/core/Button";
import FoodItem from "../../Components/FoodItems";
import CardItem from "../../Components/CardItem";

import { makeStyles } from "@material-ui/core/styles";

const categories = [
  {
    name: "Burgers",
    items: [
      {
        name: "Cheeseburger",
        image: "Images/cheeseburger.jpeg",
        ingredients: ["pan", "carne 125gr", "papas fritas"],
        size: { simple: "$390", Doble: "$470", Triples: "$550" },
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
        size: { simple: "$410", Doble: "$490" },
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
        size: { simple: "$400", doble: "$480", triples: "$560" },
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
        size: { simple: "$400", doble: "$480" },
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
        size: { simple: "$430", doble: "$510", triples: "$590" },
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
        size: { simple: "$490", doble: "$580", triples: "$660" },
      },
    ],
  },
  {
    name: "Porciones",
    items: [
      {
        name: "Papas fritas",
        image: "Images/porcionpapas.jpg",
        size: { L: "$170", XL: "$200" },
      },
      {
        name: "Batatas fritas",
        image:
          "https://static.paraloscuriosos.com/img/articles/4957/800x800/5774ea13e10d9_miniaturka.jpg",
        size: { L: "$220", XL: "$250" },
      },
      {
        name: "Espiral de papas",
        image:
          "https://www.paulinacocina.net/wp-content/uploads/2016/03/vlcsnap-2016-03-14-13h07m45s251-1-e1457972681209.jpg",
        size: { unidad: "$80", X2: "$150", X3: "$210", X4: "$260", X5: "$300" },
      },
    ],
  },
];

const useStyles = makeStyles({
  dishes: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  categoryTitle: {
    alignSelf: "flex-start",
  },
  button: {
    margin: "10px",
  },
  logo: { width: "400px", height: "500px" },
});

function MainPage() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState();

  function handleOnClick(item) {
    setOpen(true);
    setDetail(item);
  }
  console.log(detail);

  return (
    <div className={classes.page}>
      <img
        className={classes.logo}
        alt="logo"
        src="Images/StakeHouseBurgers.jpg"
      />
      <h1> Stoke House Burgers</h1>
      <span>
        <QueryBuilderIcon />
        <span>8 P.M. - 12 P.M.</span>
        <PhoneAndroidIcon />
        <span> 11 7360-7946</span>
      </span>
      <div>
        <Button className={classes.button} variant="contained" color="primary">
          Todas las categorias
        </Button>
        <Button variant="outlined" className={classes.button} color="primary">
          Burgers
        </Button>
        <Button variant="outlined" className={classes.button} color="primary">
          Porciones
        </Button>
        <Button variant="outlined" className={classes.button} color="primary">
          Dips
        </Button>
      </div>

      <div>
        {categories.map((category) => (
          <div className={classes.category}>
            <h1 className={classes.categoryTitle}>{category.name}</h1>
            <div className={classes.dishes}>
              {category.items.map((item) => (
                <FoodItem
                  onClick={() => handleOnClick(item)}
                  image={item.image}
                  itemName={item.name}
                  ingredients={
                    !!item.ingredients ? item.ingredients.join() : ""
                  }
                  price={item.size.simple}
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
            ingredients={!!detail.ingredients ? detail.ingredients.join() : ""}
            price={detail.size.simple}
          />
        )}
      </div>
    </div>
  );
}
export default MainPage;
