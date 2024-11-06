import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Platform, Pressable, Text, View } from 'react-native'
import styles from '../styles'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useDispatch, useSelector } from 'react-redux'
import { getExpoPushToken, isRegistered, setExpoPushToken, unsetExpoPushToken } from '../store/registrationSlice'

const handleRegistrationError = (err: string) => {
  alert(err)
  throw new Error(err)
}

const Registration = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useDispatch()

  const registered = useSelector(isRegistered)
  const expoPushToken = useSelector(getExpoPushToken) ?? 'n/a'

  const handleRegistration = async () => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get expo push token for push notifications')
        return
      }

      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
      if (!projectId) {
        handleRegistrationError('Project ID not set')
      }

      try {
        const expoPushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data
        console.log(`expoPushToken = ${expoPushToken}`)

        // store the expo push token in persistent storage
        dispatch(setExpoPushToken( expoPushToken))
      } catch (err: any) {
        handleRegistrationError(`${err}`)
      }
    } else {
      handleRegistrationError('Must use a physical device for expo push notifications')
      throw new Error('Must use a physical device for expo push notifications')
    }
  }

  // useful while testing
  const handleUnregistration = async () => {
    dispatch(unsetExpoPushToken())
    // todo - server call to remove device
  }

  return(
    <View style={styles.container}>
      <Text>Current Status: {registered ? 'Registered' : 'Unregistered'}</Text>
      <>
        <Text>Expo Push Token:</Text>
        <Text>{expoPushToken}</Text>
      </>
      {!registered && (
      <Pressable
        style={styles.button}
        onPress={handleRegistration}>
        <Text>Register</Text>
      </Pressable>
      )}
      { registered && (
        <Pressable
          style={styles.button}
          onPress={handleUnregistration}>
          <Text>Unregister</Text>
        </Pressable>
      )}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
    </View>
  )
}

export default Registration
