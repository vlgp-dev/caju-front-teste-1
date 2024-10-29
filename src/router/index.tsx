import { Redirect, Route, Switch } from "react-router-dom";

import DashboardPage from "~/pages/Dashboard";
import NewUserPage from "~/pages/NewUser";

import routes from "./routes";

const Router = () => {
  return (
    <div style={{ marginTop: 64, padding: "0 12px" }}>
      <Switch>
        <Route exact path={routes.dashboard} component={DashboardPage} />
        <Route exact path={routes.newUser} component={NewUserPage} />

        <Route exact path="*">
          <Redirect to={routes.dashboard} />
        </Route>
      </Switch>
    </div>
  );
};

export default Router;
