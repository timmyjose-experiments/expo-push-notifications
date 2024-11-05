import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Calculator from './screens/Calculator'
import Registration from './screens/Registration'
import { Provider } from 'react-redux'
import { store } from './store/store'

export type RootStackParamList = {
  Home: undefined
  Calculator: undefined
  Registration: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Calculator' component={Calculator} />
          <Stack.Screen name='Registration' component={Registration} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App