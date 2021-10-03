import React, { useContext, useRef, useEffect} from 'react'
import ContactContext from '../../context/contact/ContactContext'
 const ContactFilter = () => {

    const contactContext = useContext(ContactContext);
    const {filterContacts, clearFilter, filtered} = contactContext;
    const text = useRef('');


    useEffect(() => {
      if(filtered === null){
        text.current.value = '';
      }
    });

    const onChange = e => {
        if(text.current.value !== ''){
            filterContacts(e.target.value);
        }
        else {
            clearFilter();
        }
    }
    //useREf == used to refernce a dom object directly
    return (
        <form>
            <h2    className = "text-primary text-center">Search</h2>
            <input ref ={text} type = "text" placeholder = "search for contact" onChange = {onChange}></input>
        </form>
    )
}
export default ContactFilter;
