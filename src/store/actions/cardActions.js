import * as actionTypes from './actionTypes';

export const setCardPairsList = (cardsList) => {
    return {
        type: actionTypes.SET_CARD_PAIRS_LIST,
        cardsList
    }
}