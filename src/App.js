import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CartProvider from "./Components/context/cartContext";
import MainPage from "./Pages/MainPage";
import CheckOutPage from "./Pages/CheckOutPage";
import Footer from "./Components/Footer";

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
      <Footer />
    </Router>
  );
}

export default App;
