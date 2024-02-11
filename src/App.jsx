import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Products from './Components/Products/Products.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import CounterContextProvider from './Components/Context/CounterContext.js';
import CartContextProvider from './Components/Context/CartContext.js';
import { Toaster } from 'react-hot-toast';
import CheckConnection from './Components/CheckConnection/CheckConnection.js';
import Checkout from './Components/Checkout/Checkout.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import { Provider } from 'react-redux'
import store from './Components/Redux/Redux';
function App() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUser()
    }
  }, [])

  function saveUser() {
    let encodedToken = localStorage.getItem('userToken')
    let decoded = jwtDecode(encodedToken)
    console.log(decoded);
    setUserData(decoded)
  }

  const routes = createBrowserRouter([
    {
      path: '', element: <Layout userData={userData} setUserData={setUserData} />, children: [
        { index: true, element: <ProtectedRoutes><Home /> </ProtectedRoutes> },
        { path: 'login', element: <Login saveUser={saveUser} /> },
        { path: 'register', element: <Register /> },
        { path: 'cart', element: <ProtectedRoutes><Cart /> </ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: 'products-details/:id', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: 'checkout', element: <ProtectedRoutes><Checkout /></ProtectedRoutes> },
        { path: 'allorders', element: <ProtectedRoutes><AllOrders /></ProtectedRoutes> },
        { path: '*', element: <NotFound /> }]
    }])
  return (
    // <>
    //   <CounterContextProvider> 
    //     <RouterProvider router={routes} />
    //   </CounterContextProvider>

    //   <CartContextProvider>
    //     <cart />
    //   </CartContextProvider>
    // </>
    <Provider store={store}>
    <CheckConnection>
    <CartContextProvider>

      <CounterContextProvider>
        <Toaster/>
        <RouterProvider router={routes} />
      </CounterContextProvider>

    </CartContextProvider>
</CheckConnection>
</Provider>
  );
}

export default App;