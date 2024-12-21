import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import client from './apolloclient.tsx';
import { ApolloProvider } from '@apollo/client';

createRoot(document.getElementById('root')!).render(

  <ApolloProvider client={client}>
    <div className="App">
      <App />
    </div>
  </ApolloProvider>
)
