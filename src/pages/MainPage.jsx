import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import styles from '../styles/app.module.css'
import {useToDos} from "../context/context.jsx";
import {fetchTodos, addTodo, setSearchTerm, toggleSort, resetTodos} from "../redux/actions/todoActions.jsx";
import {useDispatch, useSelector} from "react-redux";

export function MainPage() {
    const dispatch = useDispatch();
    const {todos, isSorted, searchTerm} = useSelector(state => state.todos)
    const {isLoading, error } = useSelector(state => state.ui)
    const [newToDoText, setNewToDoText] = useState('')

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    function handleAddToDO(e) {
        e.preventDefault()
        dispatch(addTodo(newToDoText))
            .then(() => setNewToDoText(''))
            .catch(err => console.error(err))
    }

    function handleSearchToDoByPhrase(e) {
        dispatch(setSearchTerm(e.target.value))
    }

    function handleToggleSort() {
        dispatch(toggleSort())
    }

    return (
        <div className={styles.container}>
            <form action="" className={styles.form} onSubmit={handleAddToDO}>
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
                           value={searchTerm}
                           onChange={handleSearchToDoByPhrase} />
                    <button className={styles.button} onClick={handleToggleSort}>{isSorted ? 'Disable sort' : 'Enable sort'}</button>
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
