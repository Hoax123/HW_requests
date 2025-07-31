import styles from '/src/styles/NotFoundPage.module.css'
import {Link} from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className={styles.container}>
            <div className={styles.errorCode}>404</div>
            <p className={styles.subtitle}>page not found :(</p>
            <Link to="/" className={styles.homeLink}>
                Go to home
            </Link>
        </div>
    )
}