import {Routes, Route} from "react-router-dom";
import {MainPage} from "./pages/MainPage.jsx";
import {TaskPage} from "./pages/TaskPage.jsx";
import {NotFoundPage} from "./pages/NotFoundPage.jsx";


export function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/task/:id" element={<TaskPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    )
}