import React, { Fragment, useContext, useEffect } from 'react';
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter  from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';
//import "../../App.css";
export const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    },[]);
    return (
        <div className = "row gx-5">  
            <div className = 'col'>
            <ContactForm/>
            </div>
            
            <div className = 'col'>
            <ContactFilter/>
            <Contacts/> 
            </div>     
        </div>
    )
}
export default Home