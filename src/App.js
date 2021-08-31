import React from "react";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import { AuthProvider } from "./Contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";
import FetchUsers from "./UserPages/FetchUsers";
import AddEditPage from "./UserPages/AddEditPage";
import ProfilePage from "./UserPages/ProfilePage";
import SkillsPage from "./UserPages/SkillsPage";
import UpdateProfile from "./Components/UpdateProfile";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute
              exact
              path="/update-profile"
              component={UpdateProfile}
            />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/fetch-users" component={FetchUsers} />
            <Route path="/skills" component={SkillsPage} />

            <Route path="/add-edit" component={AddEditPage} />
            <Route path="/update/:id" component={AddEditPage} />
            <Route path="/profile/:id" component={ProfilePage} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
