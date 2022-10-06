import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import LogReg from './views/LogReg';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import Profile from './components/Profile';
import UpdateEvent from './components/UpdateEvent';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element = {<LogReg/>} path = "/" />
          <Route element = {<EventList/>} path = "/home" />
          <Route element = {<CreateEvent/>} path = "events/new" />
          <Route element = {<Profile/>} path = "/user/profile/:username" />
          <Route element = {<UpdateEvent/>} path = "/events/update/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
