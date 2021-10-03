import React, {useState, useContext, useEffect} from 'react'
import '../../App.css';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);


    const {setAlert} = alertContext;
    const {registerUser, error, clearErrors, isAuthenticated} = authContext;

useEffect(() => {
    if(isAuthenticated){
        props.history.push('/');
    }
    console.log(error);
    if(error === 'User Already Exists'){
        setAlert(error,'danger');
        clearErrors();
    }
    }, [error, isAuthenticated,props.history])
    const [user,setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
      const {name, email, password, password2} = user;
const onChange = (e) =>{
    setUser({...user,[e.target.name]: e.target.value});
}

const onSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT TRIGGERED");
    if(name === '' || email === '' || password === '') {
           console.log("not filled submit");
        setAlert("Please Enter All Fields", "danger");
    }
    else if(password !== password2){
        setAlert("Passwords Do Not Match: No Match", "danger")
    } 
    else{
        registerUser({
            name: name,
            email: email,
            password: password
        });
        console.log(name, email, password)
        //console.log("Register Log");
    }
}
   
    return (
        <div className = "form-container">
            <h1>
                Account <span className = "text-primary">Register</span>
            </h1>
            <form onSubmit = {onSubmit}>
                <div className = "form-group">
                    <label htmlFor = "name">Name</label>
                    <input type = "text" name = "name" value = {name} onChange = {onChange}  /> 
                </div>
                <div className = "form-group">
                    <label htmlFor = "email">Email</label>
                    <input type = "email" name = "email" value = {email} onChange = {onChange}/>
                </div>
                <div className = "form-group">
                    <label htmlFor = "password">Password</label>
                    <input type = "password" name = "password"  minLength = "6" value = {password} onChange = {onChange} />
                </div>      
                <div className = "form-group">
                    <label htmlFor = "password2">Verify Password</label>
                    <input type = "password" name = "password2" value = {password2} onChange = {onChange}/>
                </div> 
                <input type="submit" value = "Register" className = "btn btn-primary btn-block"/>        
            </form>
      
                
        </div>
    )
}

export default Register;
