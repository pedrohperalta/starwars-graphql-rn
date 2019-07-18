import gql from 'graphql-tag'
import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

interface Details {
  name: string
  birthYear: string
  films: Array<Film>
}

interface Film {
  title: string
}

interface Data {
  loading: boolean
  error: Error
  Person: Details
}

const PERSON_DETAILS_QUERY = gql`
  query Person($id: ID!) {
    Person(id: $id) {
      id
      name
      birthYear
      films {
        id
        title
      }
    }
  }
`

export default class CharacterDetails extends PureComponent<NavigationScreenProps> {
  public static navigationOptions = {
    title: 'Details',
  }

  render() {
    const id = this.props.navigation.getParam('id')

    return (
      <Query<Data> query={PERSON_DETAILS_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          let content: JSX.Element

          if (loading) {
            content = <ActivityIndicator />
          } else if (error) {
            content = <Text style={styles.error}>{error.message}</Text>
          } else {
            content = (
              <View>
                <Text style={styles.name}>Name: {data!.Person.name}</Text>
                <Text style={styles.birthYear}>Birth Year: {data!.Person.birthYear}</Text>
                {data!.Person.films.map(film => (
                  <Text style={styles.films}>- {film.title}</Text>
                ))}
              </View>
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
    backgroundColor: '#f0f0f0',
  },
  error: {
    padding: 24,
    fontSize: 16,
  },
  name: {
    fontSize: 22,
    marginLeft: 8,
    marginTop: 8,
  },
  birthYear: {
    fontSize: 20,
    marginLeft: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  films: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 4,
  },
})
