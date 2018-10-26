import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './../styles/index';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { addQuestion } from './../actions/index';
import { _addQuestion } from '../utils/api';

class CreateCard extends Component {

  state={
    question:'',
    answer:'',
  }

  onQuestionTextChange=(text)=>{
    this.setState(()=>({
      question: text
    }))
  }

  onAnswerTextChange=(text)=>{
    this.setState(()=>({
      answer: text
    }))
  }

  onSubmit =()=>{
    const {dispatch, deck} = this.props;
    const question = {
      question: this.state.question,
      answer: this.state.answer
    };
    _addQuestion(deck, question);
    dispatch(addQuestion(deck.title, question));
    this.setState(()=>({
      question:'',
      answer:''
    }));
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput value={this.state.question} placeholder={'Question'} onChangeText={this.onQuestionTextChange} ></TextInput>
        <TextInput value={this.state.answer} placeholder={'Answer'} onChangeText={this.onAnswerTextChange} ></TextInput>
        <TouchableOpacity onPress={this.onSubmit}><Text>Submit</Text></TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, {navigation}){
  const {deckId} = navigation.state.params;
  const deck = decks[deckId];
  return {
    deck
  }
}

export default connect(mapStateToProps)(CreateCard);