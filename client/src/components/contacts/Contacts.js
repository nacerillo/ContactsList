import React, {Fragment, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/ContactContext';
import { ContactItem } from './ContactItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Spinner from "../layout/Spinner";
export const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts, filtered, getContacts,loading} = contactContext;
    
    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    },[]);
    if(contacts !== null && contacts.length === 0 && !loading){
        return (<h4>No Contacts Listed</h4>)
    }
    return (
        <Fragment>
            {contacts !== null && !loading ? (
            <TransitionGroup> { 
              filtered !== null ? 
              filtered.map(contact => (
              <CSSTransition key ={contact._id} timeout = {500} className = "item">
                  <ContactItem key = {contact._id} contact = {contact}/>
                  </CSSTransition>))
              : 
              contacts.map(contact => (
              <CSSTransition key ={contact._id} timeout = {500} className = "item">
                  <ContactItem key = {contact._id} contact = {contact}/>
                  </CSSTransition> ))
            }
            </TransitionGroup>
            ): <Spinner/>}
          
        </Fragment>
    );
}
export default Contacts
