import styled from "styled-components";

import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 24px;
  height: 24px;
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;

//without importing the component to the styling, and leaving it in the cart-icon.component
// export const CartIconContainer = styled.div`
//   width: 45px;
//   height: 45px;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   svg {
//     width: 24px;
//     height: 24px;
//   }
// `;

//with scss:
// import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

// export const ShoppingIcon = styled(ShoppingSvg)`
//   width: 24px;
//   height: 24px;
// `;