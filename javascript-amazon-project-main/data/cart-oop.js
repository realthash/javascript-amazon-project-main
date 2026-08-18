//function to create instance of the cart (function should be PascalCase for instanciating functions)
function Cart(cartString) {
    const cart = {
        cartItems: JSON.parse(localStorage.getItem(cartString)) || [{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '1'
        }],

        saveToStorage() {
            localStorage.setItem(cartString, JSON.stringify(this.cartItems))
        },

        addtoCart(itemId) {
            let matchingItem;

            this.cartItems.forEach((cartitem) => {
                if (cartitem.productId === itemId) {
                    matchingItem = cartitem
                }

            })
            if (matchingItem) {
                matchingItem.quantity += 1
            } else {
                this.cartItems.push({
                    productId: itemId,
                    quantity: 1,
                    deliveryOptionId: '1'
                })
            }
            console.log(this.cartItems)

            this.saveToStorage()
        },

        removeCartItem(cartItemId) {
            let newCart = []

            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== cartItemId) {
                    newCart.push(cartItem)
                }
            })
            this.cartItems = newCart
            this.saveToStorage()
        },

        updateDeliveryOption(itemId, deliveryOptionId) {

            let matchingItem;

            this.cartItems.forEach((cartitem) => {
                if (cartitem.productId === itemId) {
                    matchingItem = cartitem
                }
            })

            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveToStorage()
        }
    }

    return cart;
}

//creating multiple instances
const cart = Cart('cart-oop')
const businessCart = Cart('cart-business')




cart.saveToStorage()
businessCart.saveToStorage()



console.log(cart)
// {cartItems: Array(1), saveToStorage: ƒ, addtoCart: ƒ, removeCartItem: ƒ, updateDeliveryOption: ƒ}
console.log(businessCart)
// {cartItems: Array(2), saveToStorage: ƒ, addtoCart: ƒ, removeCartItem: ƒ, updateDeliveryOption: ƒ}