import gql from 'graphql-tag'
import React, { PureComponent } from 'react'
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
import { NavigationScreenProps } from 'react-navigation'

interface Character {
  id: string
  name: string
  gender: string
}

interface Data {
  loading: boolean
  error: Error
  allPersons: Array<Character>
}

const ALL_PERSONS_QUERY = gql`
  {
    allPersons {
      id
      name
      gender
    }
  }
`

export default class Characters extends PureComponent<NavigationScreenProps> {
  public static navigationOptions = {
    title: 'Characters',
  }

  renderCharacter = ({ item }: { item: Character }) => (
    <TouchableWithoutFeedback onPress={() => this.onCharacterClicked(item)}>
      <View style={styles.characterContainer}>
        <Text style={styles.characterName}>{item.name}</Text>
        <Text style={styles.characterGender}>{item.gender}</Text>
      </View>
    </TouchableWithoutFeedback>
  )

  onCharacterClicked = (character: Character) => {
    this.props.navigation.navigate('Details', { id: character.id })
  }

  render() {
    return (
      <Query<Data> query={ALL_PERSONS_QUERY}>
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
              <StatusBar barStyle="light-content" />
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
    backgroundColor: '#f0f0f0',
  },
  error: {
    padding: 20,
    fontSize: 16,
  },
  list: {
    padding: 20,
  },
  characterContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4e4',
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
