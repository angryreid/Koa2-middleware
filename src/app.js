import React, { Component } from 'react';
import { Route, Switch, BrowserRouter ,HashRouter} from "react-router-dom";
import regeneratorRuntime from 'regenerator/runtime';
import routes from "./routes";
import "antd/dist/antd.css";
import "./assets/style/common.scss";

// console.log
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <HashRouter>
        <Switch>
          {routes.map(({ name, path, exact = true, component }) => (
            <Route path={path} exact={exact} component={component} key={name} />
          ))}
        </Switch>
      </HashRouter>
    );
  }
}
 
export default App;
