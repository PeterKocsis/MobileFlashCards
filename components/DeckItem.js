import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import styles from './../styles/index';
import { handleReceiveDecks } from './../actions/index';

class DeckItem extends Component {

  state={
    bounceAnim : new Animated.Value(1),
  }

  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
  }

  onDeckSelection=(item)=>{
    const {navigation} = this.props;
    Animated.sequence([
      Animated.timing(this.state.bounceAnim, { duration: 200, toValue: 1.04}),
      Animated.spring(this.state.bounceAnim, { toValue: 1, friction: 4})
    ]).start(()=>navigation.navigate('DeckView', {deckId:item}))
  }

  renderItem=({item})=>{
    const {decks, navigation} = this.props;
    const deck = decks[item];
    return (
      <Animated.View style={{transform: [{scale: this.state.bounceAnim}]}}>
        <TouchableOpacity
          onPress={()=>this.onDeckSelection(item)}
          style={styles.card}>
          <Text style={styles.mainText}>{deck.title}</Text>
          <Text style={styles.text}>{`Cards: ${deck.questions.length}`}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  keyExtractor = (item, index)=> {
    const  {decks} = this.props;
    return decks[item].title;
  };

  render(){
    const {decks} = this.props;
    const noDeckinDecks = Object.getOwnPropertyNames(decks).length === 0;
    debugger
    return(
      <View style={styles.container}>
        {noDeckinDecks ? (<Text style={styles.title}>No deck has been created. You can create your own deck on the "Add Deck" tab.</Text>)
        :<FlatList
          data = {Object.keys(decks)}
          renderItem={this.renderItem}
          keyExtractor = {this.keyExtractor}>
        </FlatList>}
      </View>
    )
  }
}

function mapStateToProps(decks, {navigation}){
  return {
    navigation,
    decks
  };
}

export default connect(mapStateToProps)(DeckItem);