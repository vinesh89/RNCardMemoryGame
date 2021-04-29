import React,{useRef, useState, useEffect} from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Styled from 'styled-components';

const NumberLabel = Styled.Text`
    margin: auto;
    font-size: 16px;
    font-weight: bold;
    align-items: center;
    text-align: center;
    justify-content: center;
`

const CardFlipItem = ({cardValue, onPress, cardItem}) => {

    //const [updatedvalue, setUpdatedValue] = useState(0);

    const animatedValue = useRef(new Animated.Value(0)).current;
    let updatedvalue = 0;

    useEffect(() => {
        animatedValue.addListener(({ value }) => {
            updatedvalue = value;
        });
        
        return () => {
            animatedValue.removeAllListeners();
        };
    }, []);

    let setFrontInterpolate = animatedValue.interpolate({
        inputRange: [0, 90],
        outputRange: ['0deg', '180deg'],
    });

    let setBackInterpolate = animatedValue.interpolate({
        inputRange: [0, 90],
        outputRange: ['0deg', '180deg'],
    });

    const frontAnimatedStyle = {
        transform: [
            {rotateY: setFrontInterpolate}
        ]
    }

    const backAnimatedStyle = {
        transform: [
            {rotateY: setBackInterpolate}
        ]
    }

    const flipCard = () => {
        if (updatedvalue >= 90) {
            Animated.timing(animatedValue, {
                toValue: 90,
                duration: 800,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(animatedValue, {
                toValue: 180,
                duration: 800,
                useNativeDriver: true
            }).start();
        }
        onPress(cardValue);
    }

    return(
        <TouchableOpacity onPress={() => flipCard(cardValue)}>
            {cardItem.show ?
                <Animated.View style={[styles.backContainer, backAnimatedStyle]}>
                    <NumberLabel style={{ color: 'black' }}>{cardItem.value}</NumberLabel>
                </Animated.View>
                :
                <Animated.View style={[styles.frontContainer, frontAnimatedStyle]}>
                    <NumberLabel style={{ color: 'white' }}>?</NumberLabel>
                </Animated.View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    frontContainer: {height: 150, width: 100, backgroundColor:'grey'},
    backContainer: {height: 150, width: 100, backgroundColor:'lightblue'},
})

export default CardFlipItem;