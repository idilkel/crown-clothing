import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);

  //const addProductToCart = () => addItemToCart(product);

  const addProductToCart = () => {
    currentUser
      ? addItemToCart(product)
      : alert("Please sign-in to start shopping");
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        ADD TO CART
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
