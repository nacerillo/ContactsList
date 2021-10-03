import React, {useContext} from 'react'
import AlertContext from '../../../context/alert/AlertContext';
import '../../../App.css';
const Alerts = () => {

    const alertContext = useContext(AlertContext);
    console.log("TRIGGER");
    console.log(alertContext.alerts);
    return (
       alertContext.alerts.length > 0 &&
       
       alertContext.alerts.map(alert => (
           <div key = {alert.id} className = {`alert alert-${alert.type}`}>
               <i className = "fas fa-info-circle" />{alert.msg}
           </div>
       ))
    );
};

export default Alerts
