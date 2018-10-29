import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './../styles/index';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
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
      question: this.state.question.trim(),
      answer: this.state.answer.trim()
    };
    _addQuestion(deck, question);
    dispatch(addQuestion(deck.title, question));
    this.setState(()=>({
      question:'',
      answer:''
    }));
  }

  render(){
    const answerIsEmpty = this.state.question.trim().length !== 0;
    const questionIsEmpty = this.state.answer.trim().length !== 0;
    const submitAllowed = answerIsEmpty && questionIsEmpty;
    const sumbitButtonStyle = submitAllowed ? styles.button : [styles.button, styles.disabledButton];
    const submitButtonTextStyle = submitAllowed ? styles.buttonText : [styles.buttonText, styles.disabledButtonText];
    return(
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <TextInput
            value={this.state.question}
            placeholder={'Question'}
            onChangeText={this.onQuestionTextChange}
            style={styles.input}
            underlineColorAndroid='transparent'
            >
          </TextInput>
          <TextInput
            value={this.state.answer}
            placeholder={'Answer'}
            onChangeText={this.onAnswerTextChange}
            style={styles.input}
            underlineColorAndroid='transparent'
            >
          </TextInput>
        </View>
        <TouchableOpacity disabled={!submitAllowed} onPress={this.onSubmit} style={sumbitButtonStyle}><Text style={submitButtonTextStyle}>Submit</Text></TouchableOpacity>
      </KeyboardAvoidingView>
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