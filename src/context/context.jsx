import {createContext, useContext, useEffect, useState} from "react";
import {data, useParams} from "react-router-dom";

export const ToDoContext =  createContext(null)

export function useToDos() {
    return useContext(ToDoContext)
}

export function ToDoProvider({children}) {
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [originalToDos, setOriginalToDos] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/todos')
            .then(res => res.json())
            .then(data => {
                setTodos(data)
                setOriginalToDos(data)})
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }, [])

    function addToDo(title) {
        if(!title.trim()) return
        setIsLoading(true)

        fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {'content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({
                title: title
            })
        })
            .then(res => res.json())
            .then(data => {
                setTodos([...todos, data])
                setOriginalToDos([...originalToDos, data])
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }


    function deleteToDo(id) {
        setIsLoading(true);
        return fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTodos(prev => prev.filter(todo => String(todo.id) !== id));
                setOriginalToDos(prev => prev.filter(todo => String(todo.id) !== id));
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }

    function editToDo(id, newTitle) {
        return fetch(`http://localhost:3001/todos/${id}`, {
            method: 'PATCH',
            headers: {'content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({
                title: newTitle
            })
        })
            .then(res => res.json())
            .then(data => {
                setTodos(prev => prev.map(todo => String(todo.id) === id ? data : todo));
                setOriginalToDos(prev => prev.map(todo => String(todo.id) === id ? data : todo));
                return data;
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }

    return (
        <ToDoContext.Provider value={{
            todos,
            setTodos,
            originalToDos,
            isLoading,
            addToDo,
            deleteToDo,
            editToDo
        }}>
            {children}
        </ToDoContext.Provider>
    )
}