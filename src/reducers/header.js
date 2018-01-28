export default function footer(state = {
  value: 'Initial Header Data',
  timestamp: Date.now()
}, action) {
  console.log(`Header reducers being checked`);
  switch (action.type) {
    case 'UPDATE_HEADER_TEXT':
      return Object.assign({},state, {
        value: action.payload,
        timestamp: Date.now()
      });
    default:
      return state;
  }
}