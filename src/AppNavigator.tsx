import { createStackNavigator, createAppContainer } from 'react-navigation'
import Characters from './characters/Characters'
import CharacterDetails from './details/CharacterDetails'

const AppNavigator = createStackNavigator(
  {
    Characters: Characters,
    Details: CharacterDetails,
  },
  {
    initialRouteName: 'Characters',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        color: '#ffd300',
        fontSize: 16,
      },
    },
  }
)

export default createAppContainer(AppNavigator)
