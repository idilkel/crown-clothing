import { useContext } from "react";

//moved to styles
//import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

// import { useContext } from "react";

// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

// import { CartContext } from "../../contexts/cart.context";

// import {} from "./cart-icon.styles";

// const CartIcon = () => {
//   const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

//   const toggleIsCartOpen = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   return (
//     <div className="cart-icon-container" onClick={toggleIsCartOpen}>
//       <ShoppingIcon className="shopping-icon" />
//       <span className="item-count">{cartCount}</span>
//     </div>
//   );
// };

//export default CartIcon;
