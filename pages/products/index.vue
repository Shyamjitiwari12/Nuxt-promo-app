
<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">All Products</h1>
        <div class="columns is-multiline">
          <!-- iterate columns with v-for and don't forget :key -->
          <div
            v-for="product in cproducts"
            :key="product.fields.title"
            class="column is-one-quarter">
            <!-- pass a course as a prop to course-card -->
            <v-popover
              offset="16"
              trigger="hover"
              placement="right-start">
              <product-card :product="product" @addToCart="addToCart" /> 
              <template slot="popover">
                <course-card-tooltip
                  :title="product.fields.title"
                  :metadata="product.metadata"
                  :createdat="product.careatedAt"
                  :url="product.fields.file.url"
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
import ProductCard from '~/components/ProductCard'
import CourseCardTooltip from '~/components/CourseCardTooltip'
import Client from '~/plugins/contenful'

import { mapState } from 'vuex'
export default {
  data() {
    return{
      cproducts : []
    } 
  },
  head: {
    title: 'Amazing Products | Shyam Ji Tiwari'
  },
  components: {
    ProductCard, CourseCardTooltip
  },
  created(){
    this.getPosts();
  },
  methods : {
    getPosts(){
      Client
      .getEntries({
        content_type: 'product'
      })
      .then(entries => {
        console.log(entries)
        this.cproducts =  entries.includes.Asset
      })
      .catch(e => console.log(e))
    },
    addToCart(product){
      debugger
      this.$store.dispatch('products/addToCart', product)

    }
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

