import * as actionTypes from '../actions/actionTypes';
import { updateStateObject } from '../../utils/utility';

const setCardPairsList = (state, action) => {
    return updateStateObject(state, {cardsList: action.cardsList});
}

const cardReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.GET_CARD_PAIRS_LIST: return setCardPairsList(state, action);
        default: return state;
    }
}

export default cardReducer;