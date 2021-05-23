import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Button from "@material-ui/core/Button";
import FoodItem from "../../Components/foodItems";

const items = [
  {
    name: "burgers",
    items: [
      {
        name: "cheeseburger",
        image: "Images/cheeseburger.jpeg",
        ingredients: ["pan", "carne 125gr", "papas fritas"],
        size: { simple: "$390", doble: "$470", triples: "$550" },
      },
      {
        name: "classic",
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
        size: { simple: "$410", doble: "$490" },
      },
      {
        name: "sweetmeat",
        image: "Images.sweetmeat.jpeg",
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
        name: "veggie",
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
        name: "grilled onion",
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
        name: "bully burger",
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
    name: "porciones",
    items: [
      {
        name: "Papas fritas",
        image: "Images/porcionpapas.jpg",
        size: { L: "$170", XL: "$200" },
      },
      {
        name: "Batatas fritas",
        size: { L: "$220", XL: "$250" },
      },
      {
        name: "ESpiral de papas",
        size: { unidad: "$80", X2: "$150", X3: "$210", X4: "$260", X5: "$300" },
      },
    ],
  },
];

function MainPage() {
  return (
    <div>
      <img alt="logo" src="Images/StakeHouseBurgers.jpg" />
      <h1> Stoke House Burgers</h1>
      <span>
        <QueryBuilderIcon />
        <span>8 P.M. - 12 P.M.</span>
        <PhoneAndroidIcon />
        <span> 11 7360-7946</span>
      </span>
      <div>
        <Button variant="contained" color="primary">
          Todas las categorias
        </Button>
        <Button variant="outlined" color="primary">
          Burgers
        </Button>
        <Button variant="outlined" color="primary">
          Porciones
        </Button>
        <Button variant="outlined" color="primary">
          Dips
        </Button>
      </div>
      <div>
        <h2>Burgers</h2>
        {items.map((item) => (
          <FoodItem
            image={item.items.image && item.image}
            itemName={item.name}
            ingredients={item.items.ingredients}
            price={item.items.size}
          />
        ))}
      </div>
    </div>
  );
}
export default MainPage;
