import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu=useLoaderData();
  console.log(menu)
  return <ul className="divide-y divide-stone-200 px-2">
    {/* children elements  mai line daal dega of color stone-200 */}
    {menu.map((item)=>{
      return <MenuItem pizza={item} key={item.id}/>
    })}
  </ul>
}
export async function loader()
{
  const menu=await getMenu();
  return menu;
}
export default Menu;
