import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView} from 'react-native';
import { handleAddDeck } from './../actions/index';
import styles from './../styles/index';
import { StyleSheet } from 'react-native';
import { lightPurp, gray, orange, black, purple, blue, white, green, red } from './../utils/colors';

class AddDeck extends Component {

  state={
    title:'',
  }

  onTitleChange=(input)=>{
    this.setState(()=>({
      title : input
    }));
  }

  onSubmit=()=>{
    const {dispatch, navigation} = this.props;
    const deckData = {
        title : this.state.title,
        questions : []
    };
    this.setState(()=>({
      title:''
    }));
    Promise.resolve(dispatch(handleAddDeck(deckData)))
      .then(()=>{
        navigation.navigate('DeckView', {deckId: deckData.title});
      });
  }

  render(){
    const submitAllowed = this.state.title.trim().length !==0;
    const buttonStyle = submitAllowed ? styles.button :  [styles.button,local.disabledButton];
    return(
      <KeyboardAvoidingView style={styles.container}>
        <View style={{alignItems:'center'}}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput
            value={this.state.title}
            onChangeText={this.onTitleChange}
            placeholder='Title of the deck'
            style={styles.input}
            underlineColorAndroid='transparent'
            >
          </TextInput>
        </View>
        <TouchableOpacity
          onPress={this.onSubmit}
          style={buttonStyle}
          disabled={this.state.title.trim().length===0}
          >
            <Text style={submitAllowed ? styles.buttonText : [styles.buttonText, local.disabledButtonText]}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddDeck);

const local = StyleSheet.create({
  disabledButton: {
    backgroundColor : white,
    borderWidth:1,
  },
  disabledButtonText: {
    color: gray,
    fontStyle: 'italic'
  },
})