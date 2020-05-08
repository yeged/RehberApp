import { SIGN_UP, LOGIN } from "../actions/auth"

const initialState = {
    token: null,
    userId: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SIGN_UP:
            return {
                token: action.token,
                userId: action.userId
            }
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            }
        default:
            return state;
    }
}

export default authReducer