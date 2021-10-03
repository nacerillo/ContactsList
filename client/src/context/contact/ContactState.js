import React, { useReducer} from "react";
import {v4 as uuid} from "uuid";
import axios from 'axios';
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from "../types";

const ContactState = props => {
    const initialState = {
        contacts : null,
        current: null,
        filtered: null,
        error: null
    };

const [state, dispatch] = useReducer(ContactReducer, initialState)

const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({
          type: GET_CONTACTS,
          payload: res.data
      });
    }
    catch(err) {
        dispatch({
            type: CONTACT_ERROR,
            payload: err.response.message
        })
    }
    
}
 //Add Contact
const addContact = async (contact) => {
   // contact.id = uuid();
   const config = {
       headers: {
           'Content-Type': 'application/json'
       }
   }
   //dont need to pass it token, because the token is created globally
   try {
    const res = await axios.post('/api/contacts',contact,config);
    dispatch({type: ADD_CONTACT, payload: res.data});
   }
   catch(err) {
        dispatch({type: CONTACT_ERROR, payload: err.message})
   }
}
 // Delete Contact
const deleteContact = async id => {
    try {
        await axios.delete(`api/contacts/${id}`);
         dispatch({type: DELETE_CONTACT, payload: id});
    }
    catch(err) {
         dispatch({type: CONTACT_ERROR, payload: err.message})
    }
       // dispatch({type: DELETE_CONTACT, payload: id});
}

const clearContacts = () => {
    dispatch({type: CLEAR_CONTACTS});
}
 // Set Current Contact
const setCurrent = async (contact) => {
        dispatch({type: SET_CURRENT, payload: contact});
}
 //Clear Current Contact
const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
}
 //Update Current Contact
const updateContact = async (contact) => {
     const config = {
       headers: {
           'Content-Type': 'application/json'
       }
     }
   try {
        const res = await axios.put(`/api/contacts/${contact._id}`,contact,config);
        dispatch({type: UPDATE_CONTACT, payload: res.data});
   }
   catch(err) {
        dispatch({type: CONTACT_ERROR, payload: err.message})
   }
        //dispatch({type: UPDATE_CONTACT, payload: contact});
}
 //Filter Contacts
const filterContacts = (text) => {
    dispatch({type: FILTER_CONTACTS, payload: text})
}
 // Clear Filter
const clearFilter = () => {
    dispatch({type: CLEAR_FILTER})
}

    return (

        <ContactContext.Provider value = {{
            contacts: state.contacts, 
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact, 
            getContacts,
            updateContact,
            deleteContact, 
            clearContacts,
            setCurrent,
            clearFilter,
            filterContacts,
            clearCurrent}}>            
            {props.children}
        </ContactContext.Provider>
    );
};
export default ContactState;