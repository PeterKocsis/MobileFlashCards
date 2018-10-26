import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './../styles/index';

class DeckItem extends Component {
  renderItem=({item})=>{
    const {decks, navigation} = this.props;
    const deck = decks[item];
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('DeckView', {deckId:item})}>
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
    return(
      <View style={styles.container}>
        {Object.getOwnPropertyNames(decks).length === 0 && (<Text>There is no available deck at the moment. You can create one on the "Add Deck" tab.</Text>)}
        <FlatList
          data = {Object.keys(decks)}
          renderItem={this.renderItem}
          keyExtractor = {this.keyExtractor}>
        </FlatList>
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