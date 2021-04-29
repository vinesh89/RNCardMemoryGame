/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cardsReducer from './src/store/reducer/cardReducer';

const rootReducer = combineReducers({
  cardsList: cardsReducer,
});

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const AppComponent = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}    

AppRegistry.registerComponent(appName, () => AppComponent);
