import { Link } from "react-router-dom";
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./store/cart-context";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

function NavBar() {
  return (
    <div id="navigation-bar" className="bg-dark row fs-1 text-light px-5">
      <Link to="/" className="col-sm-6 text-start text-light">
        HK Souvenir
      </Link>
      <Link to="/cart" className="col-sm-6 text-end text-light">
        Cart
      </Link>
    </div>
  )
}

export default App;