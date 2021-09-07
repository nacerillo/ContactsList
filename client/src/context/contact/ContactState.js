import React, { useReducer} from "react";
import {v4 as uuid} from "uuid";
import axios from 'axios';
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
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
        contacts : [
            /*{
                id: 1,
                name: "jill Johnson",
                email: "jj@gmail.com",
                phone: "111-111-1111",
                type: "personal",
                address: "1234 Street St"
            },
            {
                id: 2,
                name: "Bert Baker",
                email: "bb@gmail.com",
                phone: "222-222-2222",
                type: "professional",
                address: "5678 Driver Dr"
            },
            {
                id: 3,
                name: "Sven Stevens",
                email: "ss@gmail.com",
                phone: "333-333-3333",
                type: "personal",
                address: "9101 Roaders Rd"
            }*/

        ],
        current: null,
        filtered: null,
        error: null
    };

 const [state, dispatch] = useReducer(ContactReducer, initialState)

 //Add Contact
const addContact = async (contact) => {
   // contact.id = uuid();
   const config = {
       headers: {
           'Content-Type': 'application/json'
       }
   }
   //dont need to pass it token, because the token is created globally
   try{
    const res = await axios.post('/api/contacts',contact,config);
    dispatch({type: ADD_CONTACT, payload: res.data});
   }catch(err){
        dispatch({type: CONTACT_ERROR, payload: err.message})
   }
}
 // Delete Contact
const deleteContect = id => {
        dispatch({type: DELETE_CONTACT, payload: id});
}

 // Set Current Contact
const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
}
 //Clear Current Contact
const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
}
 //Update Current Contact
const updateContact = contact => {
        dispatch({type: UPDATE_CONTACT, payload: contact});
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
            updateContact,
            deleteContect, 
            setCurrent,
            clearFilter,
            filterContacts,
            clearCurrent}}>            
            {props.children}
        </ContactContext.Provider>
    );
};
export default ContactState;