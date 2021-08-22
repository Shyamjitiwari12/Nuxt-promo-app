import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'digitup1.myshopify.com',
  storefrontAccessToken: 'a085b88549cdd832eb1de618ff86bb29'
});

export default client ;