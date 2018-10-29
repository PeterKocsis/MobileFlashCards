import { StyleSheet } from 'react-native';
import { lightPurp, gray, orange, black, purple, blue, white } from './../utils/colors';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding:30,
  },
  button : {
    backgroundColor: lightPurp,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 7,
    height: 45,
    width: 150,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: purple,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
    flex:1,
  },
  mainText: {
    color: white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text : {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: black,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaa',
  },
  input:{
    width: 300,
    borderRadius:2,
    borderWidth:1,
    borderColor: black,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft:10,
    paddingRight: 10,
  },
  row:{
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: 'bold',
    color: white,
  }
});