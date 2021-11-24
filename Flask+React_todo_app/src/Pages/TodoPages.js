import React, {useState,useEffect} from "react";
import { Card } from "../Components/Card/card";
import { Form } from "../Components/Form/form";


export const TodoPage = ()=> {
    const [todo, setTodo] = useState([])
    const [addTodo, setaddTodo] = useState('')

    useEffect(()=> {
        fetch('/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setTodo(data))
    },[])

    const handleFormChange = (inputValue) => {
        setaddTodo(inputValue)
        console.log(addTodo)
    }

    const handleFormsubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                content: addTodo
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(response => response.json())
        .then(message => {
            console.log(message)
            setaddTodo('')
            getLatestTodos()
        })
    }

    const getLatestTodos = () => {
        fetch('/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setTodo(data))
    }

    return(
        <>
            <h1>
                <Form userInput={addTodo} onFormChange={handleFormChange} onFormSubmit={handleFormsubmit}/>
               <Card listOfTodos={todo} />
            </h1>
        </>
    )
}