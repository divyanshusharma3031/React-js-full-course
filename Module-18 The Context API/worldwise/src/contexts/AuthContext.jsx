import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("No such Action Found");
  }
}
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function AuthProvider({ children }) {
  console.log(children);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      return true;
    }
    return false;
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
    {children}
  </AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("The Context is called outside the defined boundaries");
  }
  return context;
}

export { useAuth, AuthProvider };
