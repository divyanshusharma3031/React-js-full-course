import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu,{loader as menuLoader} from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order,{loader as orderLoader} from "./features/order/Order";
import CreateOrder,{action as createOrderAction} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement:<Error/>,//ya toh yaha rakhdo par isme ye Applayout ke ander nahi aayga ya to tum jaha jaha error ke chances hai waha rakho. for example /menu.
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader:menuLoader,
        errorElement:<Error/>//since error bubble up hote hai ise yahi mil jaayga error handling element. That's why upar nahi jaayga 
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/:id",
        element: <Order />,
        loader:orderLoader,
        errorElement:<Error/>
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action:createOrderAction,
        errorElement:<Error/>
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
