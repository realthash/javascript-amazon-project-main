export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '1'
}]

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

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
            quantity: 1,
            deliveryOptionId: '1'
        })
    }
    console.log(cart)

    saveToStorage()
}

export function removeCartItem(cartItemId) {
    let newCart = []

    cart.forEach((cartItem) => {
        if (cartItem.productId !== cartItemId) {
            newCart.push(cartItem)
        }
    })
    cart = newCart
    saveToStorage()
}