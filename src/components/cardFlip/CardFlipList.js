import React, { useState, useEffect, memo } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert} from 'react-native';
import CardFlipItem from './CardFlipItem';
import { CHOOSE_NUMBER_OF_CARD_PAIRS } from '../../utils/GeneratePairsNumList';

const CardFlipList = ({listItems, restart}) => {
    
    const [listValues, setListValues] = useState(listItems);
    const [prevCardItemIndex, setPrevCardItemIndex] = useState(-1);
    const [matchedCardsList, setMatchedCardsList] = useState([]);
    const [stepCount, setStepCount] = useState(0);

    useEffect(() => {
        const updatedList = listItems.map(item => {
            return {
                value: item,
                show: false
            }
        });
        setListValues(updatedList);
    }, [listItems]);

    const handleCardFlip = (index) => {
        setStepCount(stepCount + 1);
        const updatedListState = [...listValues];
        updatedListState[index].show = true;
        
        if (prevCardItemIndex == -1) {
            setPrevCardItemIndex(index);
        }

        if (prevCardItemIndex !== index && prevCardItemIndex != -1) {
            if (updatedListState[prevCardItemIndex].value === updatedListState[index].value) {
                updatedListState[prevCardItemIndex].show = true;
                updatedListState[index].show = true;
                const updatedMatchedCardList = [...matchedCardsList];
                updatedMatchedCardList.push(updatedListState[index]);
                if (updatedMatchedCardList.length === CHOOSE_NUMBER_OF_CARD_PAIRS) {
                    setTimeout(() => {
                        handleGameOver();
                    }, 1000);
                }
                setMatchedCardsList(updatedMatchedCardList);
                setListValues(updatedListState);
            } else {
                setTimeout(() => {
                    updatedListState[prevCardItemIndex].show = false;
                    updatedListState[index].show = false;
                    setListValues(updatedListState);
                }, 1000);
            }
            setPrevCardItemIndex(-1);
        }
        
    };

    const renderListItems = ({item, index}) => {
        const value = matchedCardsList.find((cardItem) => cardItem.value === item.value && item.show === false) ? item.value : item.show ? item.value : "?";
        return(
            <View style={{ padding: 5}}>
                <CardFlipItem cardValue={value} onPress={() => handleCardFlip(index)} cardItem={item} />
            </View>
        )
    }

    const handleRestart = () => {
        setStepCount(0);
        setMatchedCardsList([]);
        restart();
    }

    const handleGameOver = () => {
        console.log("Game Over !!");
        Alert.alert(
          "Game Over",
          `Congratulation, you finished the game in ${stepCount + 1} steps !!`,
          [
            { text: "OK", onPress: () => handleRestart() }
          ]
        );    
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text>Step Count: {stepCount}</Text>
                <Button title="Restart" onPress={() => handleRestart()} />
            </View>
            <FlatList
                contentContainerStyle={styles.listContainer}
                extraData={listValues}
                numColumns={3}
                data={listValues}
                renderItem={renderListItems}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { marginTop: 40, paddingTop: 20},
    listContainer: { justifyContent: 'center', alignItems: "center", padding: 10},
    headerContainer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}
})

export default memo(CardFlipList);