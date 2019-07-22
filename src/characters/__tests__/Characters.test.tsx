import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { ActivityIndicator, FlatList, Text } from 'react-native'
import renderer from 'react-test-renderer'
import wait from 'waait'
import Characters, { ALL_PERSONS_QUERY } from '../Characters'

const createTestProps = (props: any) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
})

const allPersons = [
  {
    id: 'cj0nv9p8yewci0130wjy4o5fa',
    name: 'Luke Skywalker',
    gender: 'MALE',
  },
  {
    id: 'cj0nv9p9gewck0130h8f8esy0',
    name: 'C-3PO',
    gender: 'UNKNOWN',
  },
  {
    id: 'cj0nv9p9wewcm01302r07xzna',
    name: 'R2-D2',
    gender: 'UNKNOWN',
  },
]

const personsMock = {
  request: {
    query: ALL_PERSONS_QUERY,
  },
  result: {
    data: {
      allPersons,
    },
  },
}

const errorMock = {
  request: {
    query: ALL_PERSONS_QUERY,
  },
  errors: new Error('Error!'),
}

describe('<Characters>', () => {
  it('renders the loading view before receiving the data response', async () => {
    const props = createTestProps({})
    const component = renderer.create(
      <MockedProvider mocks={[personsMock]} addTypename={false}>
        <Characters navigation={props} />
      </MockedProvider>
    )

    expect(component.root.findByType(ActivityIndicator)).not.toBeNull()

    await wait(0)
  })

  it('renders the characters list when the receiving data was successfully', async () => {
    const props = createTestProps({})
    const component = renderer.create(
      <MockedProvider mocks={[personsMock]} addTypename={false}>
        <Characters navigation={props} />
      </MockedProvider>
    )

    await wait(0)

    expect(component.root.findByType(FlatList).props.data).toEqual(allPersons)
  })

  it('renders the error message when there is an error in the response', async () => {
    const props = createTestProps({})
    const component = renderer.create(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <Characters navigation={props} />
      </MockedProvider>
    )

    await wait(0)

    expect(component.root.findByType(Text).props.children).toEqual(
      'Something went wrong while fetching the data. Please, try again later.'
    )
  })
})
