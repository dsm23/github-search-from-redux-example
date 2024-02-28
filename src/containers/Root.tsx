// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { FunctionComponent } from "react";
import { Provider } from "react-redux";
import DevTools from "./DevTools";
import { Route } from "react-router-dom";
import App from "./App";
import UserPage from "./UserPage";
import RepoPage from "./RepoPage";
import type { RootState } from "~/app/store";

type Props = {
  store: RootState;
};

const Root: FunctionComponent<Props> = ({ store }) => (
  <Provider store={store}>
    <main className="container mx-auto mt-8">
      <Route path="/" component={App} />
      <Route path="/:login/:name" component={RepoPage} />
      <Route path="/:login" component={UserPage} />
      <DevTools />
    </main>
  </Provider>
);

export default Root;
