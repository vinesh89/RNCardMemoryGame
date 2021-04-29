/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import CardFlipList from './src/components/cardFlip/CardFlipList';
import { generatePairNumberList, CHOOSE_NUMBER_OF_CARD_PAIRS } from './src/utils/GeneratePairsNumList';

const App = () => {

  const [cardListItems, setCardListItems] = useState([]);

  useEffect(() => {
    getCardItemsList();
  }, []);

  const getCardItemsList = () => {
    setCardListItems(generatePairNumberList(CHOOSE_NUMBER_OF_CARD_PAIRS));
  };

  return (
    <View style={styles.container}>
      {cardListItems.length > 0 ?
        <CardFlipList listItems={cardListItems} restart={getCardItemsList}/>
        :
        <Text>Loading Cards...</Text>
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
