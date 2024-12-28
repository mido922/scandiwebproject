import {
  ApolloClient,
  HttpLink,
  InMemoryCache
} from '@apollo/client';


const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://167.99.92.107:8000' }),
  cache: new InMemoryCache(),
});

export default client;