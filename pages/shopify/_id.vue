<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">{{product.title}}</h1>
        <div class="columns is-multiline">
          <!-- iterate columns with v-for and don't forget :key -->
          <div
            v-for="variant in variants"
            :key="variant.id"
            class="column is-one-quarter">
            
            <!-- pass a course as a prop to course-card -->
            <v-popover
              offset="16"
              trigger="hover"
              placement="right-start">
              <variant-card :variant="variant" @addToCart="addToCart" /> 
            </v-popover>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import VariantCard from '~/components/ShopifyProductVariantCard'
import gql from 'graphql-tag'
import Client from '~/plugins/shopify'

export default {
    apollo: {
    node: gql`
     {
        node(id : "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3NTIxNDY1MjIyODM=") {
            id
            ... on Product {
                variants(first: 5) {
                    edges {
                        node {
                            id
                            price
                            image{
                                originalSrc
                            }
                            title
                            
                        }
                    }
                }
            }
        }
    }
    `,
  },
  head() {
    return {
      title: this.product.title + ' | Shyam Ji Tiwari ',
      meta: [
        { hid: 'description', name: 'description', content: this.product.title }
      ]
    }
  },
  components: {
    VariantCard
  },
  data(){
      return{
          product : {},
          variants : []
      }
  },
  methods : {
    async fetchShopifyProduct(){

        const productId = this.$route.params.id;
        console.log('id'+ productId);
        await Client.product.fetch(productId).then((product) => {
        console.log(product.variants);
        this.product = product;
        this.variants = product.variants
        });
    },
    addToCart(variant){
      debugger

       this.$store.dispatch('products/addToCartShopify', variant)
      //this.addLineToCheckout(variant, item);
    },
    addLineToCheckout(variant, item){
        const checkoutId = process.env.SHOPIFY_CHECKOUT_ID ;
        const lineItemsToAdd = [
            {
                variantId: variant.node.id,
                quantity: item.quantity,
                customAttributes: [{key: "price", value: variant.node.price}, {key: "total", value: variant.node.price * item.quantity}]
            }
        ];

        // Add an item to the checkout
        client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
        // Do something with the updated checkout
        console.log(checkout.lineItems); // Array with one additional line item
        });
    },
  },
  created(){
      this.fetchShopifyProduct();
  }
  
}
</script>

<!-- Fetch course by Slug -->
<!-- 1. create action "fetchCourseBySlug" in store/course.js -->
<!-- 2. send GET request '/api/v1/products/s/:slug' -->
<!-- 3. expect to receive "course" in "then" and commit it to state -->
<!-- 4. get course in computed properties -->
<!-- 5. Complete TODO's -->
<!-- 6. Navigate to detail page from home page when clicking on "Learn More" -->

<style lang="scss">
  .what-you-get {
    background-color: #f9f9f9;
    border: 1px solid #dedfe0;
    padding: 10px 15px;
    &-title {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &-items {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 17px;
      width: 45%;
    }
  }
  .course-description {
    &-title {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &-details {
      font-size: 18px;
      ul {
        list-style: disc;
        margin-left: 20px;
      }

      ol {
        margin-left: 20px;
      }

      strong {
        font-size: 20px;
      }
      p {
        min-height: 30px;
      }
    }
  }
</style>
