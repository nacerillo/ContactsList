import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';
import PropTypes from 'prop-types';
const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const {clearContacts} = contactContext;
    const {isAuthenticated, logoutUser, user} = authContext; 

    const onLogout = () =>{
        logoutUser();
        clearContacts();
    }
    const authLinks = (
        <Fragment><li> Hello {user && user.name}</li>
        <li>
            <a onClick = {onLogout} href = "#!">
                <i className = "fas fa-signout-alt"/>{' '}
                <span className = "hide-sm">Logout</span>
            </a>
        </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>            
            <li><Link to = "/register">Sign Up</Link></li>
            <li><Link to = "/login">Login</Link></li>
        </Fragment>
    );
    return (
        <div className = "navbar bg-primary">
            <h1>
                <i className = {icon}/>{title}
            </h1>
           <ul>
               {isAuthenticated ? authLinks : guestLinks}
           </ul>
        </div>
    )
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = { 
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}
export default Navbar;
