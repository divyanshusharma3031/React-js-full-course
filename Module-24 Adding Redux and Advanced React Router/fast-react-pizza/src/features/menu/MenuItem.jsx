import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantities from "../cart/UpdateItemQuantities";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch=useDispatch();
  const currentQuantity=useSelector((state)=>{
    return getCurrentQuantityById(state,id);
  })
  // console.log(name,currentQuantity);
  const handleAddToCart=(e)=>{
    const newItem={
      pizzaId:id,
      name,
      quantity:1,
      unitPrice,
      totalPrice:unitPrice
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-semibold">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {currentQuantity>0 && <div className="flex items-center gap-3 sm:gap-8">
            <UpdateItemQuantities pizzaId={id} currentQuantity={currentQuantity }/>
            <DeleteItem pizzaId={id}/>
            </div>}
          {!soldOut && currentQuantity===0 && <Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}
export default MenuItem;
