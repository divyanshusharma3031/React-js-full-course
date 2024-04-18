import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const username=useSelector((state)=>{
    return state.user.username;
  })
  return (
    <div className="mb-8 text-center ">
      <h1 className="p-4 text-xl font-semibold sm:my-16 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username===""?<CreateUser />:<Button to="/menu" type="primary">Continue Ordereing, {username}</Button>}
    </div>
  );
}

export default Home;
