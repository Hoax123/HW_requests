import {useParams, Link, Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from '../styles/TaskPage.module.css'
import {editTodo, deleteTodo} from "../redux/actions/todoActions.jsx";
import {useDispatch, useSelector} from "react-redux";

export function TaskPage(props) {
    const {isLoading} = useSelector(state => state.ui)
    const dispatch = useDispatch();
    const [taskText, setTaskText] = useState("");
    const [localLoading, setLocalLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    const task = useSelector(state => state.todos.todos.find(todo => String(todo.id) === id))

    useEffect(() => {
        if (task) {
            setTaskText(task.title)
        } else {
            setLocalLoading(true);
            fetch(`http://localhost:3001/todos/${id}`)
                .then(res => res.json())
                .then(task => {setTaskText(task.title);})
                .finally(() => setLocalLoading(false));
        }
    }, [id, task])

    async function handleEdit() {
        setLocalLoading(true);
        let newToDoTitle = prompt('Enter a new title', taskText);

        if (newToDoTitle !== null) {
            try {
                await dispatch(editTodo(id, newToDoTitle))
            } catch (error) {
                console.error(error);
            } finally {
                setLocalLoading(false);
            }
        } }

        function handleDelete() {
            dispatch(deleteTodo(id))
                .then(() => navigate('/'))
                .catch(error => console.log(error))
                .finally(() => setLocalLoading(false));
        }

        if (isLoading) {
            return <p className={styles.loading}>Loading data...</p>
        }

        return (
            <div className={styles.taskContainer}>
                <div className={styles.taskHeader}>

                    <Link to="/" className={styles.backButton}>
                        ← Назад
                    </Link>
                </div>

                <div className={styles.taskContent}>
                    <p className={styles.taskText}>{taskText}</p>

                    <div className={styles.taskMeta}>
                        <span>ID: {id}</span>
                    </div>
                </div>

                <div className={styles.taskActions}>
                    <button
                        className={`${styles.taskButton} ${styles.editButton}`}
                        type="button"
                        onClick={handleEdit}
                        disabled={isLoading}
                    >
                        Редактировать
                    </button>

                    <button
                        className={`${styles.taskButton} ${styles.deleteButton}`}
                        type="button"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        )
}