import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, Text, TextInput, View } from 'react-native'
import styles from '../styles'
import { useEffect, useState } from 'react'
import { calculate } from '../gateway'
import { useSelector } from 'react-redux'
import { getExpoPushToken, isRegistered } from '../store/registrationSlice'

const Calculator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [x, setX] = useState<number>(0.0)
  const [y, setY] = useState<number>(0.0)

  const registered = useSelector(isRegistered)
  const deviceId = useSelector(getExpoPushToken)

  useEffect(() => {
    if (!registered) {
      navigation.navigate('Registration')
    }
  }, [registered])

  const handleAdd = async () => {
    try {
      await calculate({ op: 'add', x, y, deviceId })
    } catch (err: any) {
    }
  }

  const handleSub = async () => {
    try {
      await calculate({ op: 'sub', x, y, deviceId })
    } catch (err: any) {
    }
  }

  const handleMul = async () => {
    try {
      await calculate({ op: 'mul', x, y, deviceId })
    } catch (err: any) {
    }
  }

  const handleDiv = async () => {
    try {
      await calculate({ op: 'div', x, y, deviceId })
    } catch (err: any) {
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Enter the first number'
        keyboardType='numeric'
        value={x?.toString()}
        onChangeText={text => {
          try {
            setX(parseFloat(text))
          } catch (err) {
            setX(0)
          }
        }}/>
      <TextInput
        style={styles.textInput}
        placeholder='Enter the second number'
        keyboardType='numeric'
        value={y?.toString()}
        onChangeText={text => {
          try {
            setY(parseFloat(text))
          } catch (err) {
            setY(0)
          }
        }} />
        <View style={{ flexDirection: 'row'}}>
          <Pressable
            style={styles.smallButton}
            onPress={handleAdd}>
            <Text>Add</Text>
          </Pressable>
          <Pressable
            style={styles.smallButton}
            onPress={handleSub}>
            <Text>Sub</Text>
          </Pressable>
          <Pressable
            style={styles.smallButton}
            onPress={handleMul}>
            <Text>Mul</Text>
          </Pressable>
          <Pressable
            style={styles.smallButton}
            onPress={handleDiv}>
            <Text>Div</Text>
          </Pressable>
        </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
    </View>
  )
}

export default Calculator