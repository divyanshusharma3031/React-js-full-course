import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Product from "./pages/product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CountryList from "./components/CountryList";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
function App() {
  const [cities,setcities]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

  useEffect(()=>{
    async function fetchCities()
    {
      try
      {
        setIsLoading(true);
        const res=await fetch("http://localhost:8000/cities");
        const data=await res.json();
        setcities(data);
      }
      catch(err)
      {
        console.log(err);
        alert("Error fetching Data");
      }
      finally
      {
        setIsLoading(false);
      }
    }
    fetchCities();
  },[]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
            <Route path="cities/:id" element={<City/>}/>
            <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
            <Route path="form" element={<Form/>}/>
          </Route>
          <Route path="products" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          {/* To catch all routes which doesnt match we use * */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
