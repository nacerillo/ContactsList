import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/ContactContext';
const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const {addContact, updateContact, clearCurrent, current} = contactContext;

    useEffect(() => {
        if(current !== null) {
            setContact(current);
        }
        else{
            setContact({
            name: '', 
            email: '',
            phone: '',
            type: 'personal',
            address: '' 
        });
        }
         console.log('i fire once');
    }, [contactContext,current]);
    
    const [contact, setContact] = useState({
        name: '', 
        email: '',
        phone: '',
        type: 'personal',
        address: '' 
    });

   // console.log(contact);
    const {name, email, phone, type, address} = contact;

    //takes in name, email,phone,type,and address from Form
    const onChange = (e) => {
        setContact({...contact, [e.target.name]: e.target.value});
    }

    //clear the current contact
    const clearAll = () => {
        clearCurrent();
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        }
        else{
            updateContact(contact);
        }
        clearAll();
     
        
    };

    return (
        <form onSubmit = {onSubmit}>
            <h2    className = "text-primary m-2 text-center">{current ? 'Edit Contact': 'Add Contact'}</h2>
            <input className='m-2 ' type = "text" placeholder = "name" name ="name" value = {name} onChange = {onChange}/>
            <input className='m-2 ' type="email" placeholder = "Email" name ="email" value = {email} onChange = {onChange}/>
            <input className='m-2 ' type="text" placeholder = "phone" name ="phone" value = {phone} onChange = {onChange}/>
            <h5    className='m-2 '>Contact Types</h5>
            <input className='m-2 ' type="radio"  name ="type" value = "personal" checked={type === 'personal'} onChange = {onChange}/>Personal{' '}
            <input className='m-2 ' type="radio"  name ="type" value = "professional" checked = {type === 'professional'} onChange = {onChange}/>Professional{' '}
            <h5    className='m-2 ' >Address</h5>
            <input className='m-2 ' type = "text" placeholder = "addess" name = "address" value = {address} onChange = {onChange}/>
            <div>
                <input type = "submit" value = {current ? 'Edit Contact': 'Add Contact'} className = "m-2 p-1 btn btn-primary btn-block"/>
            </div>
           
                 {current && <div>'
                     <button className = "btn btn-light btn-block" onClick = {clearAll}>Clear Contact</button>
                     </div>}
               
        </form>
    )
}

export default ContactForm
