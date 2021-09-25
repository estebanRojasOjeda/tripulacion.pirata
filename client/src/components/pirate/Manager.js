import { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import List from "./List";
import PirateForm from "./PirateForm";
import Header from "./Header";
import PirateDetail from "./PirateDetail";
import "./style/manager.css";


const Manager = () => {

    const { path, url } = useRouteMatch();

    const [pirates, setPirates] = useState([]);

    return (
        <>
          <div className="content">
            <Router>
               
                    <Header></Header>
                    <Switch>
                        <Route exact path={`${path}`}>
                            <List pirates={pirates} setPirates={setPirates} />
                        </Route>
                        <Route path={`${path}/new`}>
                            <PirateForm new={true} />
                        </Route>
                        <Route path={`${path}/view/:id`}>
                            <PirateDetail view={true} />
                        </Route>
                    </Switch>
                
            </Router>
            </div>
        </>
    )
}

export default Manager;