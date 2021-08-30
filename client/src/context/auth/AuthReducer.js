import {
     USER_LOADED,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    LOGOUT,
    AUTH_ERROR
} from "../types";

export default (state,action) => {
    switch(action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };

        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }

        default: 
            return state;
    }
}
