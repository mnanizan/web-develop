import React from "react";
import { Navigate, useNavigate } from "react-router";

export const Delete = ({id}) => {

    const navigation = useNavigate()
    const deleteTodo = () => {
        fetch(`/api/${id}`,{
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            navigation('/')
        })
    }
    return(
        <>
            <button onClick={deleteTodo}>Delete</button>
        </>
    )
}