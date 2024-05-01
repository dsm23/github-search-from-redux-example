// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect } from "react";
import type { FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";
import type { Endpoints } from "@octokit/types";
import zip from "lodash/zip";
import { loadUser, loadStarred } from "../actions";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { buttonVariants } from "~/components/button";
import GoBack from "~/components/GoBack";
import List from "~/components/List";
import User from "~/components/User";
import Repo from "~/components/Repo";
import { cn } from "~/lib/utils";

type Params = {
  login: string;
};

const UserPage: FunctionComponent = () => {
  const params = useParams<Params>();

  const dispatch = useAppDispatch();

  const repos = useAppSelector((state) => state.entities.repos);
  const starredByUser = useAppSelector(
    (state) => state.pagination.starredByUser,
  );
  const users = useAppSelector((state) => state.entities.users);

  const login = params?.login?.toLowerCase();

  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map((id) => repos[id]);
  const starredRepoOwners = starredRepos.map((repo) => users[repo.owner]);

  const user = users[login];

  useEffect(() => {
    dispatch(loadUser(login, ["name"]));
    dispatch(loadStarred(login));
  }, [dispatch, login]);

  const handleLoadMoreClick = () => {
    dispatch(loadStarred(login, true));
  };

  const renderRepo = ([repo, owner]: [
    Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"],
    Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]["owner"],
  ]) => {
    return <Repo repo={repo} owner={owner} key={repo.fullName} />;
  };

  if (!user) {
    return (
      <h1>
        <i>
          Loading {login}
          {"'s profile..."}
        </i>
      </h1>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className={cn(buttonVariants({ variant: "outline" }), " my-8 gap-x-4")}
      >
        <GoBack />
        Go Back
      </Link>

      <User user={user} />
      <hr />
      <List
        renderItem={renderRepo}
        items={zip(starredRepos, starredRepoOwners)}
        onLoadMoreClick={handleLoadMoreClick}
        loadingLabel={`Loading ${login}'s starred...`}
        {...starredPagination}
      />
    </div>
  );
};

export default UserPage;
