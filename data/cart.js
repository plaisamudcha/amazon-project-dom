export let carts;
let setTimeoutId;

loadFromStorage();

export function loadFromStorage() {
  carts = JSON.parse(localStorage.getItem("carts"));

  if (!carts) {
    carts = [];
  }
}

export let cartQuantity = carts.reduce((prev, curr) => prev + curr.quantity, 0);

export function saveToStorage() {
  localStorage.setItem("carts", JSON.stringify(carts));
}

export function addToCart(productId, productQuantity) {
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
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function updateCartQuantity(textAdded) {
  cartQuantity = 0;
  carts.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  textAdded.classList.add("show");

  if (setTimeoutId) {
    clearTimeout(setTimeoutId);
  }

  setTimeoutId = setTimeout(() => {
    textAdded.classList.remove("show");
  }, 2000);

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function updateProductQuantity(productId, quantity) {
  const updateIndex = carts.findIndex(
    (cartItem) => cartItem.productId === productId,
  );

  if (updateIndex === -1) {
    return;
  }

  carts[updateIndex].quantity = quantity;

  saveToStorage();
}

export function removeFromCart(productId) {
  const deleteIndex = carts.findIndex(
    (cartItem) => cartItem.productId === productId,
  );

  if (deleteIndex === -1) {
    return;
  }

  carts.splice(deleteIndex, 1);

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const updateIndex = carts.findIndex(
    (cartItem) => cartItem.productId === productId,
  );

  if (updateIndex === -1) {
    return;
  }

  carts[updateIndex].deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
