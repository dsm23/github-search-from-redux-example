// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import DevTools from "./DevTools";
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
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=":login/:name" element={<RepoPage />} />
          <Route path=":login" element={<UserPage />} />
        </Route>
      </Routes>

      <DevTools />
    </main>
  </Provider>
);

export default Root;
