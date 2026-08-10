export const cart = []

export function addtoCart(itemId) {
    let matchingItem;

    cart.forEach((item) => {
        if (item.productId === itemId) {
            matchingItem = item
        }

    })
    if (matchingItem) {
        matchingItem.quantity += 1
    } else {
        cart.push({
            productId: itemId,
            quantity: 1
        })
    }
    console.log(cart)
}

export function countQuantity() {
    let cartTotalQuantity = 0

    cart.forEach((item) => {
        cartTotalQuantity += item.quantity
    })

    document.querySelector('.js-cart-quantity').innerHTML = cartTotalQuantity
}