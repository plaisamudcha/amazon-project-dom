import {
  carts,
  removeFromCart,
  updateProductQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/delivery-options.js";
import { renderPaymentSummary } from "./paymentSummary.js";

function updateCartDisplay() {
  const currentCartQuantity = carts.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const itemText =
    currentCartQuantity === 0
      ? "no Items in cart"
      : currentCartQuantity > 1
        ? "items"
        : "item";
  const displayQuantity = currentCartQuantity === 0 ? "" : currentCartQuantity;

  document.querySelector(".js-return-to-home-link").innerHTML =
    `${displayQuantity} ${itemText}`.trim();
}

function deliveryOptionHTML(productId, deliveryOptionId) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE Shipping"
        : `${formatCurrency(deliveryOption.priceCents)} - Shipping`;

    const isChecked = deliveryOption.id === deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${deliveryOption.id}">
        <input
          type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${productId}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString}</div>
        </div>
      </div>
    `;
  });

  return html;
}

export function renderCart() {
  let productCartsHTML = "";

  carts.forEach((cartItem) => {
    const { productId, quantity, deliveryOptionId } = cartItem;

    const { id, image, name, priceCents } = products.find(
      (product) => product.id === productId,
    );

    const deliveryOption = deliveryOptions.find(
      (option) => option.id === deliveryOptionId,
    );

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    productCartsHTML += `
      <div class="cart-item-container js-cart-item-container-${id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>

        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src=${image}
          />

          <div class="cart-item-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-price">$${formatCurrency(priceCents)}</div>
            <div class="product-quantity">
              <span> Quantity: <span class="quantity-label js-quantity-${id}">${quantity}</span> </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-update-id="${id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${id}" />
              <span class="save-quantity-link link-primary js-save-link-${id}" data-product-save-id="${id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-delete-id="${id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(id, deliveryOptionId)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-order-summary").innerHTML = productCartsHTML;

  updateCartDisplay();

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productDeleteId } = link.dataset;

      removeFromCart(productDeleteId);

      renderCart();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productUpdateId } = link.dataset;

      const productContainer = document.querySelector(
        `.js-cart-item-container-${productUpdateId}`,
      );

      productContainer.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll("[data-product-save-id]").forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      const { productSaveId } = saveLink.dataset;

      const inputValue = +document.querySelector(
        `.js-quantity-input-${productSaveId}`,
      ).value;

      if (inputValue <= 0 || !inputValue) {
        alert("Please enter a valid quantity");
        return;
      }

      updateProductQuantity(productSaveId, inputValue);

      renderCart();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCart();
      renderPaymentSummary();
    });
  });
}
