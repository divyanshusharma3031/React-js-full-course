import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  return (
    <li className="py-3 ">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-gray-400 text-xs">{isLoadingIngredients?"Loading...":ingredients.map((item)=>{
        return <span key={item}>{item} </span>
      })}</p>
    </li>
  );
}
export default OrderItem;
