import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, Text, TextInput, View } from 'react-native'
import styles from '../styles'
import { useState } from 'react'
import { calculate } from '../gateway'

const Calculator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [x, setX] = useState<number | null>(null)
  const [y, setY] = useState<number | null>(null)

  const handleAdd = async () => {
    try {
      await calculate({ op: 'add', x, y })
    } catch (err: any) {
    }
  }

  const handleSub = async () => {
    try {
      await calculate({ op: 'sub', x, y })
    } catch (err: any) {
    }
  }

  const handleMul = async () => {
    try {
      await calculate({ op: 'mul', x, y })
    } catch (err: any) {
    }
  }

  const handleDiv = async () => {
    try {
      await calculate({ op: 'div', x, y })
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