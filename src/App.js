import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddDevice from "./components/AddDevice";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import DeviceDetails from "./pages/DeviceDetails";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/details/:id" component={DeviceDetails} />
        <Route path="/add" component={AddDevice} />
      </Switch>
    </Router>
  );
}

export default App;
