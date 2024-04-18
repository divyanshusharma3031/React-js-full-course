import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import store from "../../store";
import { clearCart, getTotalPrice } from "../cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import {  useState } from "react";
import { fetchAddress } from "../userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const totalPrice = useSelector((state) => {
    return getTotalPrice(state);
  });
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const finalPrice = totalPrice + priorityPrice;
  const cart = fakeCart;
  const dispatch = useDispatch();
  const {username,status,address,position,error}=useSelector((state)=>{
    return state.user;
  });
  const disableAddress=status==="loading";
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST" action="/order/new">
        {/* action is optional kyuki by default wo closest route par hi submit karega action mai you can tell kis path par jaana hai */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row  sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input w-full"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row  sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 text-xs text-red-700 ">
                {formErrors?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row  sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              required
            />
            {status==="error" && (<p className="mt-2 rounded-md bg-red-100 text-xs text-red-700 ">
                {error}
              </p>)}
          </div>
          {!position.latitude && !position.longitude && <span className="absolute right-[1px] z-50">
            <Button type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              disabled={disableAddress}
            >
              getLocation
            </Button>
          </span>}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input type="hidden" name="position" value={position.latitude?`${position.latitude},${position.longitude}`:""}></input>
          {/* hidden input to pass cart as ye hi ek tarika hai data pass karne ka we have done this in NodeJs as well */}
          <Button disabled={isSubmitting || disableAddress}>
            {isSubmitting
              ? "Placing Order..."
              : `Order now from ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  if(!order)
  {
    return null;
  }
  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please Give us a valid mobile Number";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const res = await createOrder(order);
  store.dispatch(clearCart()); //Do not overuse it thoda prerformance optimisation ka issue rehta hai.
  return redirect(`/order/${res.id}`);
}
export default CreateOrder;
