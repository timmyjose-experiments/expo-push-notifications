import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../App"
import { Pressable, View, Text } from "react-native"
import styles from "../styles"

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Demo')}>
        <Text>Demo</Text>
      </Pressable>
    </View>
  )
}

export default Home
