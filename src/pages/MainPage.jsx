import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import styles from '../styles/app.module.css'
import {useToDos} from "../context/context.jsx";

export function MainPage() {
    const {todos,
        setTodos,
        originalToDos,
        isLoading,
        addToDo} = useToDos()

    const [newToDoText, setNewToDoText] = useState('')
    const [searchInputValue, setSearchInputValue] = useState('')
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

    function requestAddToDo(e) {
        e.preventDefault()
        addToDo(newToDoText)
        setNewToDoText('')
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
                           value={searchInputValue}
                           onChange={handleSearchToDoByPhrase} />
                    <button className={styles.button} onClick={toggleSort}>{isSorted ? 'Disable sort' : 'Enable sort'}</button>
                </div>

                {isLoading ? (<p className={styles.loading}>Loading data...</p>) :
                    (<ul className={styles.todoList}>
                        {todos.map((todo,id) => (
                            <li className={styles.todoItem} key={todo.id}>
                                <Link to={`/task/${todo.id}`}
                                      style={{
                                          color: 'inherit',
                                          textDecoration: 'none'
                                      }}
                                >{todo.title}
                                </Link>
                            </li>
                        ))}
                    </ul>)}
            </form>
        </div>
    )
}
