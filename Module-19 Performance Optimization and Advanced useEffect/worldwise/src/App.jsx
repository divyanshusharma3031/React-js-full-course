import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import CountryList from "./components/CountryList";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

const HomePage = lazy(() => {
  return import("./pages/HomePage");
});
const Product = lazy(() => {
  return import("./pages/product");
});
const Pricing = lazy(() => {
  return import("./pages/Pricing");
});
const Login = lazy(() => {
  return import("./pages/Login");
});
const AppLayout = lazy(() => {
  return import("./pages/AppLayout");
});

const PageNotFound = lazy(() => {
  return import("./pages/PageNotFound");
});

function App() {
  const { id } = useParams();
  return (
    <>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </>
  );
}

export default App;
