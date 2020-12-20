import { STORE_CARTDETAILS } from '../actions/cartAction'

const initialState = {
    cartDetails: []
}
export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case STORE_CARTDETAILS:
            return action.payload;
        default:
            return state
    }
}