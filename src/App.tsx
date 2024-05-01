import type { FunctionComponent } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "~/app/store";
import DevTools from "~/containers/DevTools";
import Layout from "~/containers/Layout";
import RepoPage from "~/containers/RepoPage";
import UserPage from "~/containers/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={setupStore()}>
        <main className="container mx-auto mt-8">
          <Layout />
          <DevTools />
        </main>
      </Provider>
    ),
    children: [
      {
        path: ":login/:name",
        element: <RepoPage />,
      },
      {
        path: ":login",
        element: <UserPage />,
      },
    ],
  },
]);

const App: FunctionComponent = () => <RouterProvider router={router} />;

export default App;
