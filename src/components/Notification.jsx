import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { displayNotification } from "../reducers/notificationReducer";
import { clearNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const Container = styled.div`
    position: absolute;
    top: 10%;
    width: 35%;
    height: 20%;
    left: 50%;
    transform: translateX(-50%);

`

const Message = styled.h2`
    

    &.show{
        height: 100%;
        display: none;
        margin: 0.2rem;
        justify-content: center;
        border: 1px solid black;
        border-radius: 2px;
    }

    &.hidden{
        display: none;
    }

    &.success{
        background-color: green;
        display: flex;
    }
        
    &.error{
        background-color: red;
        display: flex;
    }
`

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

    return (
        <Container>
            <Message className={notification.type + ' show'}>{notification.message}</Message>
        </Container>
    )
}

export default Notification