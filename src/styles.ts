import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#c0c0c0',
    margin: 5,
    borderRadius: 5,
    height: 40,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButton: {
    backgroundColor: '#c0c0c0',
    margin: 5,
    borderRadius: 5,
    height: 40,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 2,
    margin: 5,
    borderColor: '#c0c0c0',
    height: 40,
    width: '45%',
    paddingLeft: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})

export default styles
