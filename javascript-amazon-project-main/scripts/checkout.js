import { cart, removeCartItem } from "../data/cart.js"
import { products } from "../data/products.js"
import { formatCurrency } from './utils/price.js'

let productsHTML = ''

updateCheckoutItem()

cart.forEach((cartItem) => {


  const productId = cartItem.productId

  products.forEach((product) => {
    let matchingItem = ''
    if (productId === product.id) {
      matchingItem = product

    }

    if (matchingItem) {

      productsHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingItem.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">
                $${(formatCurrency(matchingItem.priceCents))}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link js-update-btn-${matchingItem.id}" data-update-item-id="${matchingItem.id}">
                  Update
                </span>
                <input class="item-input quantity-input js-item-input-${matchingItem.id}"></input><span class="link-primary item-save-link quantity-save js-save-link-${matchingItem.id}" data-save-link="${matchingItem.id}">
                  Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link" data-delete-id="${cartItem.productId}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingItem.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingItem.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingItem.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    }
  })


})

//generating the cart item container
document.querySelector('.js-order-summary').innerHTML = productsHTML;

console.log(cart)

//delete the cart items
document.querySelectorAll('.js-delete-quantity-link').forEach((element) => {
  element.addEventListener('click', () => {

    const cartItemId = element.dataset.deleteId
    removeCartItem(cartItemId)

    const container = document.querySelector(`.js-cart-item-container-${cartItemId}`)
    container.remove()
    console.log(container)

    console.log(cart)

    //update the chekout count after deletion
    updateCheckoutItem()
  })
})

//function to update the checkout items top of the checkout page
function updateCheckoutItem() {
  let countQuantity = 0
  cart.forEach((cartItem) => {
    countQuantity += cartItem.quantity
  })

  document.querySelector('.js-return-home-link').innerHTML = countQuantity > 1 ? `${countQuantity} items` : `${countQuantity} item`
}

// udpate button
document.querySelectorAll('.js-update-quantity-link').forEach((element) => {
  element.addEventListener('click', () => {
    const productId = element.dataset.updateItemId

    console.log(productId)
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editable')
    updateCartItemQuantity()

  })
})
function updateCartItemQuantity() {
  document.querySelectorAll('.item-save-link').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.saveLink
      const container = document.querySelector(`.js-cart-item-container-${productId}`)

      const inputValue = document.querySelector(`.js-item-input-${productId}`).value
      const value = Number(inputValue)

      if (value < 1000 && value > 0) {
        cart.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            console.log(cartItem.quantity)
            cartItem.quantity = value
            console.log(cartItem.quantity)
            container.classList.remove('is-editable')
          }
        })
        updateCheckoutItem()
      }
    })
  })
}