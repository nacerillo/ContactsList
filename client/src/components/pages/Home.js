import React, { Fragment } from 'react';
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import "../../App.css";
export const Home = () => {
    return (
        <div class = "grid-2">  
            <div>
            <ContactForm/>
            </div>
            
            <div>
            <Contacts/> 
            </div>     
        </div>
    )
}
export default Home