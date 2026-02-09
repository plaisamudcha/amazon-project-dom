import { cartQuantity, addToCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

products.forEach((product) => {
  const {
    id,
    image,
    name,
    rating: { count },
  } = product;

  productsHTML += `
      <div class="product-container">
      <div class="product-image-container">
        <img
          class="product-image"
          src=${image}
        />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src=${product.getStarsUrl()}
        />
        <div class="product-rating-count link-primary">${count}</div>
      </div>

      <div class="product-price">${product.getPrice()}</div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      
      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${id}">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${id}">Add to Cart</button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;
document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    const productQuantity = +document.querySelector(
      `.js-quantity-selector-${productId}`,
    ).value;

    const textAdded = document.querySelector(`.js-added-to-cart-${productId}`);

    addToCart(productId, productQuantity);
    updateCartQuantity(textAdded);
  });
});
