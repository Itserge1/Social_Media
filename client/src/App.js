import Home from "./views/Home/Home";
import Theme from "./components/Theme/Theme";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Profile from "./views/Profile/Profile";
import LoginRegister from "./views/LoginRegister/LoginRegister";
import EditProfile from "./views/EditProfile/EditProfile";

function App() {
  return (
    <div >
      <BrowserRouter>
      <Switch>
        <Route exact path= "/">
        <LoginRegister/>
        </Route>

        <Route exact path= "/edit">
        <EditProfile/>
        </Route>

        <Route exact path= "/home">
        <Home/>
        <Theme/>
        </Route>

        <Route exact path= "/profile">
        <Profile/>
        </Route>

      </Switch>
      </BrowserRouter>
      {/* <Home/>
      <Theme/> */}
    </div>
  );
}

export default App;
