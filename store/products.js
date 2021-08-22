import { fetchAsyncQuestionPropertyQuestionProperty } from 'inquirer/lib/utils/utils'
import client from '~/plugins/shopify'

export const state = () => ({
    items: [],
    item: {},
    cart: [],
    cartQuantity: 0,
    checkoutId : 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC80NzZjYzM2NzhkOWNlNGVkZDM0MTI5YzUyMDJlYWRjNT9rZXk9NzlhZWFjYTNjOWI0MGJlMzg2Y2Q5ZWJiZjczMmRiZjQ='
  })
  
  export const actions = {
    addToCart({commit},product) {
        debugger
        commit('setCart', {id: product.sys.id, title : product.fields.title, price: 250})
      },
    addToCartShopify({commit, state},product){
        debugger
        product.quantity = 1;
        product.total = product.quantity * product.node.price
            
            const checkoutId = state.checkoutId ;
            const lineItemsToAdd = [
                {
                    variantId: product.node.id,
                    quantity: product.quantity,
                    
                }

            ];

            // Add an item to the checkout
            client.checkout.addLineItems(checkoutId, lineItemsToAdd)
            .then((checkout) => {
                debugger;
                console.log(checkout.lineItems);
                commit('setShopifyCart', checkout.lineItems);
                debugger
            });

        // commit('setCart', {id: product.node.id, title: product.node.title, price: product.node.price})

      },
      fetchCart({commit , state}){
          debugger
        const checkoutId = state.checkoutId;
        client.checkout.fetch(checkoutId).then((checkout) => {
            // Do something with the checkout
            commit('setShopifyCart', checkout.lineItems);
            console.log('Fetch Cart ' + checkout);
            
            });
        
      },
      deleteLineItem({commit, state},lineItemId){
          debugger
        const checkoutId = state.checkoutId;
        const lineItemIdsToRemove = [lineItemId];
        client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
            debugger
            commit('setShopifyCart', checkout.lineItems);
        });
      },
      updateQuantity({commit, state}, input){
          debugger
        const checkoutId = state.checkoutId;
        const lineItemsToUpdate = [
        {id: input.id , quantity: input.quantity}
        ];

        client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
            debugger
            commit('setShopifyCart', checkout.lineItems);
        });
      }
  }
  
  export const mutations = {
    setShopifyCart(state, cart){
        debugger
        state.cart = cart;
    },
    setCart(state, product) {
        debugger

        let itemInCart = state.cart.find(item => {
            return item.id === product.id ? item : false ;
        })

        if(!itemInCart){
            product.quantity = 1;
            product.total = product.quantity * product.price

            state.cart.push(product)

        }else{
            debugger;
            itemInCart.quantity = itemInCart.quantity + 1;
            itemInCart.total = itemInCart.quantity * itemInCart.price
            return itemInCart;
        }
        
      },
  }
  
  
  