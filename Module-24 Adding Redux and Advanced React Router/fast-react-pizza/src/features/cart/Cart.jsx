import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { clearCart } from './CartSlice';
import EmptyCart from './EmptyCart';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const cart = useSelector((state)=>{
    return state.cart.cart;
  })
  const username=useSelector((state)=>{
    return state.user.username;
  });
  const dispatch=useDispatch();
  if(!cart.length)
  {
    return <EmptyCart/>
  }
  return (
    <div>
      <LinkButton to="/menu" >&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>
      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map((item)=>{
          return <CartItem item={item} key={item.pizzaId}/>
        })}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={()=>{dispatch(clearCart())}}>Clear Cart</Button>
      </div>
    </div>
  );
}

export default Cart;
