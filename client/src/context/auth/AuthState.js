import React, { useReducer} from "react";
import {v4 as uuid} from "uuid";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT,
    AUTH_ERROR
} from "../types";

const AuthState = props => {
    const initialState = {
    //use local storage to store token
    user: null,
    token: localStorage.getItem(''),
    isAuthenticated: null,
    loading: true,
    error: null,

    };

 const [state, dispatch] = useReducer(AuthReducer, initialState)

 // Load User

 // Register User
 
 // Login User

 // Logout User

 //Clear Errors




 return (

        <AuthContext.Provider value = {{
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error
          }}>            
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthState;