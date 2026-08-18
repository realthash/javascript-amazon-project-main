class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey
        this.#loadLocalStorage()
    }

    #loadLocalStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '1'
        }]
    };

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
    };

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    };

    removeCartItem(cartItemId) {
        let newCart = []

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== cartItemId) {
                newCart.push(cartItem)
            }
        })
        this.cartItems = newCart
        this.saveToStorage()
    };

    updateDeliveryOption(itemId, deliveryOptionId) {

        let matchingItem;

        this.cartItems.forEach((cartitem) => {
            if (cartitem.productId === itemId) {
                matchingItem = cartitem
            }
        })

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage()

    };

}

export let cart = new Cart('cart-oop');
console.log(cart)