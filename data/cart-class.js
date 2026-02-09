class Cart {
  cartItems;
  #setTimeoutId;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  cartQuantity() {
    if (this.cartItems) {
      return this.cartItems.reduce((prev, curr) => prev + curr.priceCents, 0);
    }

    return 0;
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, productQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += productQuantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: productQuantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  updateCartQuantity(textAdded) {
    cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    textAdded.classList.add("show");

    if (this.#setTimeoutId) {
      clearTimeout(this.#setTimeoutId);
    }

    this.#setTimeoutId = setTimeout(() => {
      textAdded.classList.remove("show");
    }, 2000);

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }

  updateProductQuantity(productId, quantity) {
    const updateIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.productId === productId,
    );

    if (updateIndex === -1) {
      return;
    }

    this.cartItems[updateIndex].quantity = quantity;

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const deleteIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.productId === productId,
    );

    if (deleteIndex === -1) {
      return;
    }

    this.cartItems.splice(deleteIndex, 1);

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const updateIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.productId === productId,
    );

    if (updateIndex === -1) {
      return;
    }

    this.cartItems[updateIndex].deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const carts = new Cart("cart-oop");
const businessCarts = new Cart("cart-business");

carts.localStorageKey = "hacked-key";

console.log(carts);
console.log(businessCarts);
console.log(businessCarts instanceof Cart);
