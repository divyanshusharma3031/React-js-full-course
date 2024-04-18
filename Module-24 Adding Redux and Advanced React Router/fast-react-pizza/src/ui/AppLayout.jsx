import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const cart=useSelector((state)=>{
    return state.cart.cart;
  })
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll ">
        <main className="mx-auto max-w-4xl">
          <Outlet />
        </main>
      </div>
      {cart.length>0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
