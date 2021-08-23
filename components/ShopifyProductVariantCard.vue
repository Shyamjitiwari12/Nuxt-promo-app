<template>
  <div class="card">
    <div class="card">
      <figure class="image ">
        <img :src="variant.image.src" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{variant.title | shortenText(45)}}</p>
          <!-- <p class="subtitle is-6"><i>at {{product.sys.createdAt | formatDate}}</i></p> -->
        </div>
      </div>
      
       <div class="price-box">
        <span class="price">{{variant.price}}$</span>
        
      </div> 
    </div>
    <footer class="card-footer">
      <button @click="emitAddToCart()" class="card-footer-item">
            <span class="icon has-text-info">
                <i class="fas fa-shopping-cart"></i>
            </span>
      </button>
    </footer>
  </div>
</template>
<!-- create script, specify props of course -->
<script>

export default {
  props: {
    variant: {
      type: Object,
      required: true
    }
  },
  methods : {
      emitAddToCart(){
          debugger
          this.$emit('addToCart', this.variant);
      }
  }
}
</script>
<style lang="scss" scoped>
  .card-image:hover {
    cursor: pointer;
    opacity: 0.9;
  }
  .price-box {
    text-align: right;
    .price {
      color: gray;
      font-size: 16px;
    }
    .disc-price {
      font-size: 21px;
      font-weight: bold;
    }
  }
</style>
