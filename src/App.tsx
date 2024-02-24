// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CompatRouter } from "react-router-dom-v5-compat";
import { Root } from "./containers/Root";
import { configureStore } from "./store/configureStore";

const store = configureStore();

const App: FunctionComponent = () => (
  <Router>
    <CompatRouter>
      <Root store={store} />
    </CompatRouter>
  </Router>
);

export default App;
