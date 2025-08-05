import {useParams, Link, Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from '../styles/TaskPage.module.css'
import {useToDos} from "../context/context.jsx";

export function TaskPage(props){
    const {
        todos, deleteToDo, editToDo
    } = useToDos()

    let [taskText, setTaskText] = useState("");
    let [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(()=>{
        setIsLoading(true);

        fetch(`http://localhost:3001/todos/${id}`)
            .then(res => res.json())
            .then(task=>{
                setTaskText(task.title);
            })
            .finally(() => setIsLoading(false));
    }, [id])

    async function handleEdit() {
        setIsLoading(true);
        let newToDoTitle = prompt('Enter a new title', taskText);

        if (newToDoTitle !== null) {
            try {
                const updatedTodo = await editToDo(id, newToDoTitle);
                setTaskText(updatedTodo.title);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }

    function handleDelete() {
        try {
            deleteToDo(id)
            navigate('/')
        } catch (error) {
            console.error(error);
        }
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