import { StyleSheet } from 'react-native';
import { lightPurp, gray, orange } from './../utils/colors';
import { black } from '../node_modules/ansi-colors';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button : {
    backgroundColor: lightPurp,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 7,
    height: 45,
    width: 150,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex:1,
    backgroundColor: orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  }
});