require('dotenv').config()
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Programming Courses | Filip Jerga',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:title', name: 'og:title', content: 'Learn from amazing courses | Filip Jerga' },
      { hid: 'og:locale', name: 'og:locale', content: 'en_EU' },
      { hid: 'og:url', name: 'og:url', content: process.env.BASE_URL || 'http://localhost:3000' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80' },
      { hid: 'og:description', name: 'og:description', content: 'My name is Filip Jerga and I am an experienced software engineer and freelance developer.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: 'stylesheet', href:'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css'}
    ],
    
    script: [
      { src: 'https://kit.fontawesome.com/d33a83f69c.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
   '@/assets/scss/main.scss'
  ],
  styleResources: {
   scss: [
     '@/assets/scss/variables.scss'
   ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/filters'},
    {src: '~/plugins/vuelidate'},
    {src: '~/plugins/integrations'},
    {src: '~/plugins/components'},
    {src: '~/plugins/tooltip'},
    {src: '~/plugins/toasted', ssr: false},
    {src: '~/plugins/paginate', ssr: false},
    {src: '~/plugins/contenful', ssr: false},
    {src: '~/plugins/shopify', ssr: false},

   
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'portal-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },
  serverMiddleware: [
    '~/server/routes/index'
  ],

  buildModules: [
    // GraphQl Apollo Client
      '@nuxtjs/apollo'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://digitup1.myshopify.com/api/2021-07/graphql.json',
        httpLinkOptions: {
          headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token":
                  "a085b88549cdd832eb1de618ff86bb29"
          }
        }
      }
    }
  },

  target: 'static',

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
