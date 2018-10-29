import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView} from 'react-native';
import { handleAddDeck } from './../actions/index';
import styles from './../styles/index';

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
        title : this.state.title.trim(),
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
    const buttonStyle = submitAllowed ? styles.button :  [styles.button, styles.disabledButton];
    const buttonTextStyle = submitAllowed ? styles.buttonText : [styles.buttonText, styles.disabledButtonText];
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
            <Text style={buttonTextStyle}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddDeck);