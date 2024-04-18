import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const initialState = {
  cities: [],
  isLoading: false,
  CurrentCity: {},
  error: "",
};

function reducer(state, action) {
  // reducer function has to be pure it cant be async.
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded": //its just a convention to use / in name to make it clear ki ye cities load karega
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, CurrentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => {
          return city.id !== action.payload;
        }),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("No such action found");
  }
}

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, CurrentCity, error } = state;
  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: "Error fetching data" });
        alert("Error fetching Data");
      }
    }
    fetchCities();
  }, []);
  function getCity(id) {
    async function fetchit() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: "Error fetching data" });
        alert("Error fetching Data");
      }
    }
    fetchit();
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:8000/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      return data;
    } catch (err) {
      dispatch({ type: "rejected", payload: "Error fetching data" });
      alert("Error fetching Data");
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      dispatch({ type: "city/deleted", payload: id });
      return data;
    } catch (err) {
      dispatch({ type: "rejected", payload: "Error fetching data" });
      alert("Error fetching Data");
    }
  }
  if(error)
  {
    console.log(error);
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        CurrentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("Context was used outside its scope");
  }
  return context;
}

export { CitiesContext, CitiesProvider, useCities };
