import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

interface Character {
  name: string
  gender: string
}

interface Data {
  loading: boolean
  error: Error
  allPersons: Array<Character>
}

const allPersonsQuery = gql`
  {
    allPersons {
      name
      gender
    }
  }
`

export default class Characters extends React.PureComponent {
  renderCharacter = ({ item }: { item: Character }) => (
    <TouchableWithoutFeedback>
      <View style={styles.characterContainer}>
        <Text style={styles.characterName}>{item.name}</Text>
        <Text style={styles.characterGender}>{item.gender}</Text>
      </View>
    </TouchableWithoutFeedback>
  )

  render() {
    return (
      <Query<Data> query={allPersonsQuery}>
        {({ loading, error, data }) => {
          let content: JSX.Element

          if (loading) {
            content = <ActivityIndicator />
          } else if (error) {
            content = <Text style={styles.error}>{error.message}</Text>
          } else {
            content = (
              <FlatList<Character>
                contentContainerStyle={styles.list}
                data={data!.allPersons}
                keyExtractor={character => character.name}
                renderItem={this.renderCharacter}
              />
            )
          }

          return (
            <SafeAreaView>
              <StatusBar barStyle="dark-content" />
              <View style={styles.container}>{content}</View>
            </SafeAreaView>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  error: {
    padding: 20,
    fontSize: 16,
  },
  list: {
    padding: 20,
  },
  characterContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c3c3c3',
    padding: 20,
    marginBottom: 20,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  characterGender: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },
})
