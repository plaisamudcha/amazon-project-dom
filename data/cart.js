export const carts = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];
let setTimeoutId;

export function addToCart(productId) {
  const productQuantity = +document.querySelector(
    `.js-quantity-selector-${productId}`,
  ).value;

  let matchingItem;

  carts.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += productQuantity;
  } else {
    carts.push({
      productId,
      quantity: productQuantity,
    });
  }
}

export function updateCartQuantity(productId) {
  let cartQuantity = 0;

  carts.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const textAdded = document.querySelector(`.js-added-to-cart-${productId}`);
  textAdded.classList.add("show");

  if (setTimeoutId) {
    clearTimeout(setTimeoutId);
  }

  setTimeoutId = setTimeout(() => {
    textAdded.classList.remove("show");
  }, 2000);

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function removeFromCart(productId) {
  const deleteIndex = carts.findIndex(
    (cartItem) => cartItem.productId === productId,
  );

  if (deleteIndex === -1) {
    return;
  }

  carts.splice(deleteIndex, 1);
}
