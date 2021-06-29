import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CartProvider from "./Components/context/cartContext";
import MainPage from "./Pages/MainPage";
import CheckOutPage from "./Pages/CheckOutPage";

function App() {
  return (
    <Router>
      <CartProvider>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/checkout">
            <CheckOutPage />
          </Route>
        </Switch>
      </CartProvider>
    </Router>
  );
}

export default App;
