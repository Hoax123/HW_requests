import {useParams, Link, Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from '../styles/TaskPage.module.css'

export function TaskPage(props){
    let [taskText, setTaskText] = useState("");
    let [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    let params = useParams();
    let taskId = params.id;

    useEffect(()=>{
        setIsLoading(true);

        fetch(`http://localhost:3001/todos/${taskId}`)
            .then(res => res.json())
            .then(task=>{
                setTaskText(task.title);
            })
            .finally(() => setIsLoading(false));
    }, [taskId])

    function handleEdit() {
        setIsLoading(true);

        let newToDoTitle = prompt('Enter a new title', taskText)

        if (newToDoTitle) {
            fetch(`http://localhost:3001/todos/${taskId}`, {
                method: 'PATCH',
                headers: {'content-type': 'application/json; charset=UTF-8'},
                body: JSON.stringify({
                    title: newToDoTitle
                })
            })
                .then(res => res.json())
                .then(updatedToDO => {
                    setTaskText(newToDoTitle)
                })
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false));
        }
    }

    function handleDelete() {
        fetch(`http://localhost:3001/todos/${taskId}`, {
            method: 'DELETE',
        })
            .then(() => {
                navigate('/')
            })
            .catch(error => console.log(error))
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
                    <span>ID: {taskId}</span>
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