// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect } from "react";
import type { FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { buttonVariants } from "~/components/button";
import GoBack from "~/components/GoBack";
import List from "~/components/List";
import Repo from "~/components/Repo";
import User from "~/components/User";
import { cn } from "~/lib/utils";
import { loadRepo, loadStargazers } from "../actions";

type Params = {
  login: string;
  name: string;
};

const RepoPage: FunctionComponent = () => {
  const params = useParams<Params>();

  const dispatch = useAppDispatch();

  const repos = useAppSelector((state) => state.entities.repos);
  const stargazersByRepo = useAppSelector(
    (state) => state.pagination.stargazersByRepo,
  );
  const users = useAppSelector((state) => state.entities.users);

  const login = params?.login?.toLowerCase();
  const name = params?.name?.toLowerCase();

  const fullName = `${login}/${name}`;

  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] };
  const stargazers = stargazersPagination.ids.map((id) => users[id]);

  const repo = repos[fullName];
  const owner = users[login];

  useEffect(() => {
    dispatch(loadRepo(fullName, ["description"]));
    dispatch(loadStargazers(fullName));
  }, [dispatch, fullName]);

  const handleLoadMoreClick = () => {
    dispatch(loadStargazers(fullName, true));
  };

  const renderUser = (user) => {
    return <User user={user} key={user.login} />;
  };

  if (!repo || !owner) {
    return (
      <h1>
        <i>Loading {name} details...</i>
      </h1>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className={cn(buttonVariants({ variant: "outline" }), "my-8 gap-x-4")}
      >
        <GoBack />
        Go Back
      </Link>

      <Repo repo={repo} owner={owner} />
      <hr />
      <List
        renderItem={renderUser}
        items={stargazers}
        onLoadMoreClick={handleLoadMoreClick}
        loadingLabel={`Loading stargazers of ${name}...`}
        {...stargazersPagination}
      />
    </div>
  );
};

export default RepoPage;
