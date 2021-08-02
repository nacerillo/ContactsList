import React, {useState, useContext} from 'react'
import contactContext from '../../context/contact/ContactContext';
import ContactContext from '../../context/contact/ContactContext';
const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const [contact, setContact] = useState({
        name: '', 
        email: '',
        phone: '',
        type: 'personal',
        address: '' 
    });

    
    const {name, email, phone, type, address} = contact;

    //takes in name, email,phone,type,and address from Form
    const onChange = (e) => {
        setContact({...contact, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name: '', 
            email: '',
            phone: '',
            type: 'personal',
            address: '' 
        });
    };

    return (
        <form onSubmit = {onSubmit}>
            <h2 className = "text-primary">Add Contact</h2>
            <input type="text" placeholder = "name" name ="name" value = {name} onChange = {onChange}/>
            <input type="email" placeholder = "Email" name ="email" value = {email} onChange = {onChange}/>
            <input type="text" placeholder = "phone" name ="phone" value = {phone} onChange = {onChange}/>
            <h5>Contact Types</h5>
            <input type="radio"  name ="type" value = "personal" checked={type === 'personal'} onChange = {onChange}/>Personal{' '}
            <input type="radio"  name ="type" value = "professional" checked = {type === 'professional'} onChange = {onChange}/>Professional{' '}
            <h5>Address</h5>
            <input type = "text" placeholder = "addess" name = "address" value = {address} onChange = {onChange}/>
            <div>
                <input type = "submit" value = "Add Contact" className = "btn btn-primary btn-block"/>
            </div>

        </form>
    )
}

export default ContactForm
