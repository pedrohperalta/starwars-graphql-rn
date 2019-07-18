import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import Characters from './characters/Characters'

const client = new ApolloClient({
  uri: 'https://swapi.graph.cool/',
})

export default class App extends React.PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Characters />
      </ApolloProvider>
    )
  }
}
