import {createStore} from 'redux';
import initSubscriber from 'redux-subscriber';
import rootReducer from '../reducers/index';

export const store = createStore(rootReducer);
export const subscribe = initSubscriber(store);