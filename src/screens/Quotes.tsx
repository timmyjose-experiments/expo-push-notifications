import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, Text, View } from 'react-native'
import styles from '../styles'
import { useSelector } from 'react-redux'
import { isRegistered } from '../store/registrationSlice'
import { useEffect } from 'react'
import { notifyAllDevices } from '../gateway'

const Quote = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const registered = useSelector(isRegistered)

  useEffect(() => {
    if (!registered) {
      navigation.navigate('Registration')
    }
  }, [])

  const motivate = async () => {
    try {
      await notifyAllDevices()
    } catch (err: any) {
      console.error(err)
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={motivate}>
        <Text>Motivate Everyone</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
    </View>
  )
}

export default Quote
