import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import LogReg from './views/LogReg';
import EventList from './components/EventList';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element = {<LogReg/>} path = "/" />
          <Route element = {<EventList/>} path = "/home" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
