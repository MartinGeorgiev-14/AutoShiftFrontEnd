import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { displayNotification } from "../reducers/notificationReducer";
import { clearNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";



const Notification = () => {
    const dispatch = useDispatch()
    const notification = useSelector(n => n.notification)

    useEffect(() => {
        if (notification.type !== 'hidden') {
            const timer = setTimeout(() => dispatch(clearNotification()), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification])

    if(notification.type === 'hidden'){
        return null;
    }
    console.log("notification", notification.type)
    return (
        <div className="notification-container">
            {notification.type === "success" ? <FaCheckCircle className="text-green-500 text-5xl"/> : <IoCloseCircle className="text-red-500 text-5xl"/>}  
            <p className="font-bold text-2xl">{notification.message}</p>
        </div>
    )
}

export default Notification