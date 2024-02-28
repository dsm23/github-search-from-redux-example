// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./containers/Root";
import { store } from "./app/store";

const App: FunctionComponent = () => (
  <Router>
    <Root store={store} />
  </Router>
);

export default App;
