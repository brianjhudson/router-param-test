import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router, 
  Routes, 
  Route,
  Link,
  useNavigate,
  useParams,
  useSearchParams

} from "react-router-dom"

function Navigate() {
  const navigate = useNavigate();

  const handleNavigation = (path) => () => {
    navigate(path);
  }

  return (
    <nav>
      <ul>
        <li onClick={handleNavigation("/")}>
          Home
        </li>
        <li onClick={handleNavigation("/generalAdmission")}>
          General Admission
        </li>
      </ul>
  </nav>

  )
}

function Home() {
  return (
    <>
      <Navigate />
      <div>Home</div>
    </>
  )
}

function GeneralAdmission() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([
    {type: "student", price: 400},
    {type: "teacher", day: 1, price: 250},
    {type: "teacher", day: 2, price: 250}
  ]);

  const goToCheckout = (type) => () => {
    const stringifiedCart = JSON.stringify(cart);
    navigate(`/checkout/${type}?cart=${stringifiedCart}`)
  }

  return (
    <>
      <Navigate />
      <div>General Admission</div>
      <button onClick={goToCheckout("student")}>Checkout as Student</button>
      <button onClick={goToCheckout("teacher")}>Checkout as Teacher</button>
    </>
  )
  
}

function Checkout() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const stringifiedCart = searchParams.get("cart");
    console.log("Cart?", stringifiedCart);
    if (stringifiedCart) {
      try {
        const parsedCart = JSON.parse(stringifiedCart);
        setCart(parsedCart);
        if (Array.isArray(parsedCart)) {
          const total = parsedCart.reduce((prev, curr) => {
            return prev + curr.price;
          }, 0);
          setTotal(total);
        }
      } catch (e) {

      }
    } 
  }, []);
  return (
    <>
      <Navigate />
      <div>Checkout</div>
      <div>{JSON.stringify(params)}</div>
      <div>{searchParams.get("cart")}</div>
      <section>
        <h2>Cart:</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              Type: {item.type}
              Price: ${item.price / 100.0}
            </li>
          ))}
        </ul>
        <h3>Total: ${total / 100.0}</h3>
      </section>
    </>
  )
}


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/generalAdmission" element={<GeneralAdmission />} />
          <Route exact path="/checkout/:type" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
