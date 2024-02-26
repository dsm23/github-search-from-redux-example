// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import DevTools from "./DevTools";
import { Route } from "react-router-dom";
import App from "./App";
import UserPage from "./UserPage";
import RepoPage from "./RepoPage";

const Root = ({ store }) => (
  <Provider store={store}>
    <main className="container mx-auto">
      <Route path="/" component={App} />
      <Route path="/:login/:name" component={RepoPage} />
      <Route path="/:login" component={UserPage} />
      <DevTools />
    </main>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
