import { cart } from '../../data/cart.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js'
import { products, returnMatchingProduct } from '../../data/products.js'
import { formatCurrency } from '../utils/price.js'

export function renderPaymentSummary() {
  let html = ''
  let itemCount = 0
  let productPriceCents = 0
  let shippingCostCents = 0
  let totalBeforeTax = 0
  let estimatedPrice = 0
  const tax = 0.1

  cart.forEach((cartItem) => {

    const product = returnMatchingProduct(cartItem.productId)
    productPriceCents += product.priceCents * cartItem.quantity

    itemCount += cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem)
    shippingCostCents += deliveryOption.priceCents

  })

  totalBeforeTax = productPriceCents + shippingCostCents
  estimatedPrice = (totalBeforeTax * tax)
  const total = totalBeforeTax + estimatedPrice

  
  html = `<div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${itemCount}):</div>
          <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(shippingCostCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (${tax * 100}%):</div>
          <div class="payment-summary-money">$${formatCurrency(estimatedPrice)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(total)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`

  document.querySelector('.js-payment-summary').innerHTML = html
}