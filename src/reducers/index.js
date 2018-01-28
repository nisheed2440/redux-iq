import { combineReducers } from 'redux';
import header from "./header";
import footer from './footer';
import cart from './cart.js';

export default combineReducers({
    header,
    footer,
    cart
});