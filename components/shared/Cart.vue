<template>
    <div class="dropdown" :class="{'is-active': isActive}">
        <div class="dropdown-trigger">
            <div
                @click="isActive = !isActive"
                aria-haspopup="true"
                aria-controls="dropdown-menu">
                <span></span>
                <span class="icon has-text-info">
                    <i class="fas fa-shopping-cart"></i>
                </span>
            </div>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <div v-for="(item, index) in cart" :key="index"
                class="dropdown-item">
                    
                    <strong>{{item.title}}  ( {{ item.variant ? item.variant.title : ''}}) ,</strong>
                    <br>
                    <span>{{item.quantity}} x {{item.price || item.variant.price }} ,</span> 
                    <span>total {{item.quantity * (item.price ? item.price : item.variant.price )}}</span> 
                    <br>
                    <footer class="card-footer">
                        <span class="card-footer-item">
                                <span @click="addQuantity(item)" class="icon has-text-info">
                                    <i class="fas fa-angle-up"></i>
                                </span>
                                <span @click="decreaseQuantity(item)" class="icon has-text-info">
                                    <i class="fas fa-angle-down"></i>
                                </span>
                        </span>

                        <span @click="delLineItem(item)" class="card-footer-item">
                                <span class="icon has-text-info">
                                    <i class="fas fa-trash"></i>
                                </span>
                        </span>
                    </footer>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
        isActive: false
        }
    },
    computed:{
        ...mapState({
        cart: state => state.products.cart
    })
    },
    created(){
        this.$store.dispatch('products/fetchCart')
    },
    methods : {
        delLineItem(item){
            debugger
            this.$store.dispatch('products/deleteLineItem', item.id);
        },
        addQuantity(item){
            debugger
            this.$store.dispatch('products/updateQuantity', {id : item.id , quantity : item.quantity +1 });
        },
        decreaseQuantity(item){
            debugger
            this.$store.dispatch('products/updateQuantity', {id: item.id , quantity : item.quantity -1});
        }
    }
}
</script>