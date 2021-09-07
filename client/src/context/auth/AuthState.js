import React, { useReducer} from "react";
import {v4 as uuid} from "uuid";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
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

const AuthState = props => {
    const initialState = {
    //use local storage to store token
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,

    };

 const [state, dispatch] = useReducer(AuthReducer, initialState)

 // Load User   
 const loadUser = async () => {
     if(localStorage.token) {
         setAuthToken(localStorage.token);
     }
   //console.log("oh hiiiiii");
   //@ todo load user token into global headers

   try{
    const res = await axios.get('/api/auth');
    console.log(res);
    dispatch({type: USER_LOADED, payload: res.data});
   }
   catch(error){
    dispatch({type: AUTH_ERROR});
   }
 }

 // Register User
 const registerUser = async (formData) =>{
      const config = {
          headers: {
              'Content-Type' : 'application/json'
          }
      }

      try {
          const res = await axios.post('/api/users', formData, config);
          dispatch({type: REGISTER_SUCCESS, payload: res.data});
          loadUser();
      } catch(err) {
        dispatch({type: REGISTER_FAIL, payload: err.response.data.msg})
      }
 }
 // Login User
 const loginUser = () => {
     console.log("oh hiiiiii");
 }
 
 // Logout User
 const logoutUser = () => {
     console.log("oh hiiiiii");
 }
 
 //Clear Errors

 const clearErrors = () => {
   dispatch({type: CLEAR_ERRORS});
 }
 


 return (

        <AuthContext.Provider value = {{
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            registerUser,
            loadUser,
            loginUser,
            logoutUser,
            clearErrors
          }}>            
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthState;