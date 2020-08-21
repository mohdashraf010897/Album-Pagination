import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Albums from "./containers/Albums";
import NotFound from "./components/NotFound";
import AlbumDetails from "./containers/AlbumDetails";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Albums} />
          <Route
            path="/details/:albumId/:username/:title"
            component={AlbumDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
