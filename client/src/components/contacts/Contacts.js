import React, {Fragment, useContext} from 'react'
import ContactContext from '../../context/contact/ContactContext';
import { ContactItem } from './ContactItem';
export const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts, filtered} = contactContext;
    
    if(contacts.length === 0){
        return (<h4>No Contacts Listed</h4>)
    }
    return (
        <Fragment>
            { 
              filtered !== null ? 
              filtered.map(contact => (<ContactItem key = {contact._id} contact = {contact}/>)) 
              : 
              contacts.map(contact => ( <ContactItem key = {contact._id} contact = {contact}/> ))
            }
     
        </Fragment>
    )
}
export default Contacts
