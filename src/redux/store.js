import { createStore, combineReducers } from 'redux';

import { cartReducer } from './reducers/cartReducer'
const rootReducer = combineReducers({

    cartDetails: cartReducer,
});
const store = () => {
    return createStore(rootReducer);
}
export default store;