import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
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
import { CitiesProvider } from "./contexts/CitiesContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const { id } = useParams();
  return (
    <>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CityList />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City key={id} />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="products" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            {/* To catch all routes which doesnt match we use * */}
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </>
  );
}

export default App;
