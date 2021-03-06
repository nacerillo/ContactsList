import React, { useContext } from 'react'
import PropTypes from "prop-types";
import ContactContext from '../../context/contact/ContactContext';


export const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent} = contactContext;
    const {_id, name, email, phone, type, address} = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }
  
    return (
        <div class = "card bg-light">
            <h3 class ="text-primary text-left" >{name}{' '} 
            <span style = {{float: 'right'}}>
                <span className = {'badge ' + (type === "professional" ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                </span>
            </h3>
            <ul className = "list">
                {email && <li><i className = "fas fa-envelope-open"></i><strong>  Email:</strong> {email}</li>}
                {phone && <li><i className = "fas fa-phone"></i><strong>  Phone:</strong> {phone}</li>}
                {address && <li> <i className = "fas fa-home"></i><strong>  Address:</strong> {address}</li>}
            </ul>
            <p>
                <button className = "btn btn-dark btn-sm" onClick= {() => setCurrent(contact)}>Edit</button>
                <button className = "btn btn-danger btn-sm" onClick = {onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}