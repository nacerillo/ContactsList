import React, {useState, useContext, useEffect} from 'react'
import '../../App.css';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';
//will set the State of the user equal to the state
const Login = (props) => {
    //bring in authentication and alert context
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    //bring in setAlert, loginUser, error, clearErrors, and isAuthentcated from authContext
    const {setAlert} = alertContext;
    const {loginUser, error, clearErrors, isAuthenticated} = authContext;
    const [user,setUser] = useState({
        email: '',
        password: '',
    });

//check to see if login user is authenticated
useEffect(() => {
    if(isAuthenticated){
        props.history.push('/');
    }
    console.log(error);
    if(error === 'Invalid Credentials'){
        setAlert(error,'danger');
        clearErrors();
    }
    }, [error, isAuthenticated,props.history]);

//on input change will set user state equal to inputed data
const {email, password} = user;
const onChange = (e) =>{
    setUser({...user,[e.target.name]: e.target.value});
}

//submitting of login form
const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submit");
    //check if login fields are filled
    if(email === '' || password === ''){
        setAlert('Please fill in all fields', 'danger');
    } 
    else{
        loginUser({
            email,
            password
        })
    }
}
    return (
        <div className = "form-container">
            <h1>
                Account <span className = "text-primary">Login</span>
            </h1>
            <form onSubmit = {onSubmit}>
                <div className = "form-group">
                    <label htmlFor = "email">Email</label>
                    <input type = "text" name = "email" value = {email} onChange = {onChange}/>
                </div>
                <div className = "form-group">
                    <label htmlFor = "password">Password</label>
                    <input type = "password" name = "password" value = {password} onChange = {onChange}/>
                </div>      
                <input type="submit" value = "Login" className = "btn btn-primary btn-block"/>        
            </form>      
        </div>
    )
}

export default Login;