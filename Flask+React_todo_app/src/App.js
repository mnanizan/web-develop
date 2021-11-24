import './App.css';
import { TodoPage } from './Pages/TodoPages';
import { Show } from './Pages/Show';
import { render } from "react-dom";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<TodoPage/>}>
          </Route>
          <Route path='/:id' element={<Show/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
