import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Calculator from './screens/Calculator'
import Registration from './screens/Registration'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import * as Notifications from 'expo-notifications'
import { PersistGate } from 'redux-persist/integration/react'

// set up global push notifications handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

export type RootStackParamList = {
  Home: undefined
  Calculator: undefined
  Registration: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Calculator' component={Calculator} />
            <Stack.Screen name='Registration' component={Registration} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App