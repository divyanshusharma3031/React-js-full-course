import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice } from "./CartSlice";

function CartOverview() {
  const numPizzas=useSelector((state)=>{
    if(state.cart.cart.length===0)
    {
      return 0;
    }
    let total=0;
    state.cart.cart.forEach((item)=>{
      total=total+item.quantity;
    });
    return total;
  });
  const totalPrice=useSelector((state)=>{
    return getTotalPrice(state);
  })
  const username=useSelector((state)=>{
    return state.user.username;
  })
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200 sm:p-6">
      <p className="space-x-4 font-semibold text-sm text-stone-300 sm:space-x-6 md:text-base">
        <span>{numPizzas}</span>
        <span>${totalPrice}</span>
      </p>
     {username===""?<Link to="/" className="opacity-70 grayscale cursor-not-allowed">Open cart &rarr;</Link>:<Link to="/cart">Open cart &rarr;</Link>}
    </div>
  );
}

export default CartOverview;
