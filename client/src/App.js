import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useState } from 'react';
import UserContext from './context/UserContext';
import Content from './components/user/Content'
import Manager from "./components/pirate/Manager";


function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Content></Content>
          </Route>
          <Route path="/pirates">
            <Manager />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
