import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, TextInput, TouchableOpacity, Text} from 'react-native';
import { addDeck } from './../actions/index';
import { _addDeck } from './../utils/api';
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
    const {dispatch} = this.props;
    const deckData = {
        title : this.state.title,
        questions : []
    };
    _addDeck(deckData);
    dispatch(addDeck(deckData))
    this.setState(()=>({
      title :''
    }));
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput value={this.state.title} onChangeText={this.onTitleChange}  placeholder='Title of the deck' ></TextInput>
        <TouchableOpacity onPress={this.onSubmit}><Text>Create Deck</Text></TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks){
  return {
    decks,
  }
}

export default connect(mapStateToProps)(AddDeck);