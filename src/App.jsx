import {use, useEffect, useState} from 'react'
import styles from './app.module.css'

function App() {
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [newToDoText, setNewToDoText] = useState('')
    const [SearchInputValue, setSearchInputValue] = useState('')
    const [originalToDos, setOriginalToDos] = useState([])
    const [isSorted, setIsSorted] = useState(false)

    function toggleSort() {
        let nextSortState = !isSorted
        setIsSorted(nextSortState)

        if (nextSortState) {
            let sorted = [...todos].sort((a,b) => a.title.localeCompare(b.title))
            setTodos(sorted)
        } else {
            setTodos(originalToDos)
        }

        setSearchInputValue('')
    }

    useEffect(() => {
        fetch('http://localhost:3001/todos')
            .then(res => res.json())
            .then(data => {
                setTodos(data)
                setOriginalToDos(data)})
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }, [])


    function requestAddToDo(e) {
        e.preventDefault()
        if(!newToDoText.trim()) return
        setIsLoading(true)

        fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {'content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({
                title: newToDoText
            })
        })
            .then(res => res.json())
            .then(data => {
                setTodos([...todos, data])
                setOriginalToDos([...originalToDos, data])
                setNewToDoText('')
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }

    function requestUpdateToDo(id) {
        setIsLoading(true)

        let todo = todos.find(t => t.id === id)
        let newToDoTitle = prompt('Enter a new title', todo.title)

        if (newToDoTitle && todo.title !== newToDoTitle) {
            fetch(`http://localhost:3001/todos/${id}`, {
                method: 'PATCH',
                headers: {'content-type': 'application/json; charset=UTF-8'},
                body: JSON.stringify({
                    title: newToDoTitle
                })
            })
                .then(res => res.json())
                .then(updatedToDO => {
                    setTodos(todos.map(t => t.id === id ? updatedToDO : t))
                    setOriginalToDos(originalToDos.map(t => t.id === id ? updatedToDO : t))
                })
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false))
        }
    }


    function requestDeleteToDo(id) {
        setIsLoading(true)
        fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTodos(todos.filter(t => t.id !== id))
                setOriginalToDos(originalToDos.filter(t => t.id !== id))
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }

    function handleSearchToDoByPhrase(e) {
        let phrase = e.target.value
        setSearchInputValue(phrase)
        if (phrase === '') {
            setTodos(originalToDos)
        } else {
            let filteredToDos = originalToDos.filter(todo => todo.title.toLowerCase().includes(phrase.toLowerCase()))
            setTodos(filteredToDos)
        }

        setIsSorted(false)
    }



    return (
        <div className={styles.container}>
            <form action="" className={styles.form} onSubmit={requestAddToDo}>
                <h1 className={styles.title}>ToDo List</h1>

                <div className={styles.formElements}>
                    <input type="text"
                           className={styles.input}
                           placeholder='Enter a ToDo...'
                           value={newToDoText}
                           onChange={(e) => setNewToDoText(e.target.value)}/>
                    <button className={styles.button} type='submit' disabled={isLoading}>Add Todo</button>
                </div>

                <div className={styles.searchContainer}>
                    <input type="text"
                           className={styles.searchInput}
                           placeholder='Search ToDos...'
                           value={SearchInputValue}
                           onChange={handleSearchToDoByPhrase} />
                    <button className={styles.button} onClick={toggleSort}>{isSorted ? 'Disable sort' : 'Enable sort'}</button>
                </div>

                {isLoading ? (<p className={styles.loading}>Loading data...</p>) :
                    (<ul className={styles.todoList}>
                        {todos.map((todo,id) => (
                            <li className={styles.todoItem} key={todo.id}>
                                {todo.title}
                                <div className={styles.actions}>
                                    <button className={styles.updateButton}
                                            onClick={() => requestUpdateToDo(todo.id)}
                                            disabled={isLoading}>Edit</button>
                                    <button className={styles.deleteButton} onClick={() => requestDeleteToDo(todo.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>)}
            </form>
        </div>
    )
}

export default App