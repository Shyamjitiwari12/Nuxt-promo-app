
<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">All Products</h1>
        <div class="columns is-multiline">
          <!-- iterate columns with v-for and don't forget :key -->
          
          <div
            v-for="product in products.edges"
            :key="product.node.id"
            class="column is-one-quarter">
            <!-- pass a course as a prop to course-card -->
            
            <br>
            <v-popover
              offset="16"
              trigger="hover"
              placement="right-start">
              <shopify-product-card :product="product" @addToCart="addToCart" /> 
              <template slot="popover">
                <course-card-tooltip
                  :title="product.node.title"
                  :url="product.node.media.edges[0].node.image.originalSrc"
                />
                
              </template>
            </v-popover>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ShopifyProductCard from '~/components/ShopifyProductCard'
import CourseCardTooltip from '~/components/CourseCardTooltip'
import Client from '~/plugins/contenful'
import gql from 'graphql-tag'

import { mapState } from 'vuex'
export default {
  apollo: {
    products: gql`{
      products(first:5) {
        edges {
          node {
            id
            title
            media(first: 10) {
              edges {
                node {
                  mediaContentType
                  alt
                  ...on MediaImage {
                    image {
                      originalSrc
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
  },
  head: {
    title: 'Amazing Products | Shyam Ji Tiwari'
  },
  components: {
    ShopifyProductCard, CourseCardTooltip
  },
  methods : {
    addToCart(product){
      debugger
      
      this.$store.dispatch('products/addToCartShopify', product)
      this.createShopifyCart(product)

    },
  }

//   computed: {
//     ...mapState({
//       courses: state => state.course.items
//     })
//   },
//   async fetch({store}) {
//     await store.dispatch('course/fetchCourses')
//   }
}
</script>

<style scoped lang="scss">
  // Home page
  .links {
    padding-top: 15px;
  }
</style>

