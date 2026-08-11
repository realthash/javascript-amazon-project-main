export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
},{
    productId: 'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f',
    quantity: 10
}]

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

export function removeCartItem(cartItemId) {
  let newCart = []
  
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== cartItemId){
      newCart.push(cartItem)
    }

    cart = newCart
  })
}