<template>
  <div class="card">
    <div class="card">
      <figure class="image ">
        <img :src="product.node.media.edges[0].node.image.originalSrc" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{product.node.title | shortenText(45)}}</p>
          <!-- <p class="subtitle is-6"><i>at {{product.sys.createdAt | formatDate}}</i></p> -->
        </div>
      </div>
      
      <!-- <div class="price-box">
        <span class="price">{{product.price}}$</span>
        <span class="disc-price">{{product.discountedPrice}}$</span>
      </div> -->
    </div>
    <footer class="card-footer">
      <nuxt-link :to="`/shopify/${product.node.id}`" class="card-footer-item">See More</nuxt-link>
      
    </footer>
  </div>
</template>
<!-- create script, specify props of course -->
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods : {
      emitAddToCart(){
          debugger
          this.$emit('addToCart', this.product);
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
      text-decoration: line-through;
    }
    .disc-price {
      font-size: 21px;
      font-weight: bold;
    }
  }
</style>
