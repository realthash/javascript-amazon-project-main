import { cart, removeCartItem, saveToStorage, updateDeliveryOption } from "../data/cart.js"
import { deliveryOptions } from "../data/deliveryOptions.js"
import { products } from "../data/products.js"
import { formatCurrency } from './utils/price.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

let productsHTML = ''



updateCheckoutItem()

cart.forEach((cartItem) => {


  const productId = cartItem.productId

  products.forEach((product) => {
    let matchingItem = ''
    if (productId === product.id) {
      matchingItem = product

    }


    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        deliveryOption = option
      }
    })
    const now = dayjs()
    const deliveryDate = now.add(deliveryOption.deliveryDays, 'day')
    const formatedDate = deliveryDate.format('dddd, D MMMM')



    if (matchingItem) {

      productsHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date js-delivery-date-${matchingItem.id}">
            Delivery date: ${formatedDate}
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

            <div class="delivery-options js-delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${generateDeliveryDateHTML(matchingItem, cartItem)}
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


  })
})

//save the quantity and update the item elements and updating the cart with the new quantity
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

          //update the quantity label
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItem.quantity
        }
      })
    }
    updateCheckoutItem()
    saveToStorage()
  })
})

//update the date on the cart
function generateDeliveryDateHTML(matchingItem, cartItem) {

  let html = ''
  deliveryOptions.forEach((deliveryOption) => {
    const now = dayjs()
    const deliveryDate = now.add(deliveryOption.deliveryDays, 'day')
    const formatedDate = deliveryDate.format('dddd, D MMMM')

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} - `

    html += `
    <div class="delivery-option">
      <input type="radio" class="delivery-option-input js-delivery-option" name="delivery-option-${matchingItem.id}" ${isChecked ? 'checked' : ''} data-item-id="${matchingItem.id}" data-delivery-option-id="${deliveryOption.id}">
      <div>
        <div class="delivery-option-date">
          ${formatedDate}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
    `
  })

  return html
}

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {

    const itemId = element.dataset.itemId
    const deliveryOptionId = element.dataset.deliveryOptionId
    console.log(itemId)
    console.log(deliveryOptionId)
    updateDeliveryOption(itemId, deliveryOptionId)

    updateDeliveryDate(itemId, deliveryOptionId)

  })
})

function updateDeliveryDate(itemId, deliveryOptionId) {

  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.id === deliveryOptionId) {
      const now = dayjs()
      const deliveryDate = now.add(deliveryOption.deliveryDays, 'day')
      const formatedDate = deliveryDate.format('dddd, D MMMM')

      document.querySelector(`.js-delivery-date-${itemId}`).innerHTML = `Delivery date: ${formatedDate}`
    }
  })
}