import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.ihateani.me/v2/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Nhentai: {
        keyFields: ['id'],
      }
    }
  }),
})

export default client
