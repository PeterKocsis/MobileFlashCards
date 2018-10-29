import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './../styles/index';
import { handleReceiveDecks } from './../actions/index';

class DeckItem extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
  }

  renderItem=({item})=>{
    const {decks, navigation} = this.props;
    const deck = decks[item];
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('DeckView', {deckId:item})} style={styles.card}>
        <Text>{deck.title}</Text>
        <Text>{`Number of cards: ${deck.questions.length}`}</Text>
      </TouchableOpacity>
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
        {noDeckinDecks ? (<Text>There is no available deck at the moment. You can create one on the "Add Deck" tab.</Text>)
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