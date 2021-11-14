import LoginPage from "./components/auth/Login/LoginPage";
import RegisterPage from "./components/auth/Register/RegisterPage";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomePage from "./components/home";
import EditPage from "./components/edit";

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Switch>

          <Route exact path="/"> 
            <HomePage/>
          </Route>

          <Route exact path="/login"> 
            <LoginPage/>
          </Route>

          <Route exact path= "/register">
            <RegisterPage/>
          </Route>
          
          <Route exact path= "/user/edit/:id">
            <EditPage/>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;