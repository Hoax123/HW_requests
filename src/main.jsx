import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import {ToDoProvider} from "./context/context.jsx";
import {Provider} from "react-redux";
import {store} from "./redux/store";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <ToDoProvider>
                <App />
            </ToDoProvider>
        </BrowserRouter>
      </Provider>
  </StrictMode>,
)
