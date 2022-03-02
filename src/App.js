import "./App.css";
// import AddUser from './components/AddUser';
import UsersTable from "./components/UsersTable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SoloUserDetails from "./components/SoloUserDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <h1>CRUD Operation</h1>
        
        <Switch>
          <Route exact path="/" component={UsersTable} />
          <Route path="/:id" component={SoloUserDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
