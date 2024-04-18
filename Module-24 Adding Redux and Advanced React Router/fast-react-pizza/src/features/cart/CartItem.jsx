import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantities from "./UpdateItemQuantities";
import { getCurrentQuantityById } from "./CartSlice";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity=useSelector((state)=>{
    return getCurrentQuantityById(state,pizzaId);
  })
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {formatCurrency(quantity)}&times; {name}
      </p>
      <div className="flex items-center sm:gap-6">
        <p className="text-sm font-bold">{totalPrice}</p>
        <UpdateItemQuantities pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}
export default CartItem;
