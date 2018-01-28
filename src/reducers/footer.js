export default function footer(state = {
  value: 'Initial Footer Data',
  timestamp: Date.now()
}, action) {
  console.log(`Footer reducers being checked`);
  switch (action.type) {
    case 'UPDATE_FOOTER_TEXT':
      return Object.assign({},state, {
        value: action.payload,
        timestamp: Date.now()
      });
    default:
      return state;
  }
}