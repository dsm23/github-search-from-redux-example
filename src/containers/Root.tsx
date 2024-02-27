import type { FunctionComponent } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Provider } from "react-redux";
import DevTools from "./DevTools";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Route } from "react-router-dom";
import App from "./App";
import UserPage from "./UserPage";
import RepoPage from "./RepoPage";
import type { RootState } from "~/App";

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
