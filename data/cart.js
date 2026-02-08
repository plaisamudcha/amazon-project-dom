const carts = [];
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
