export default function cart(state = {
    value: 0, 
    timestamp: Date.now()
}, action) {
    console.log(`Cart reducers being checked!`);
    switch (action.type) {
        case 'ADD_CART_ITEM':
            return Object.assign({}, state, {
                value: state.value + 1,
                timestamp: Date.now()
            });
        case 'REMOVE_CART_ITEM':
            return Object.assign({}, state, {
                value: state.value <= 0 ? state.value : state.value - 1,
                timestamp: Date.now()
            });
        default:
            return state;
    }
}