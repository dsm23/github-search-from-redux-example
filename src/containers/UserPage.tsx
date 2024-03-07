// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect } from "react";
import type { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { Endpoints } from "@octokit/types";
import {
  loadUser as loadUserAction,
  loadStarred as loadStarredAction,
} from "../actions";
import { buttonVariants } from "~/components/button";
import GoBack from "~/components/GoBack";
import User from "../components/User";
import Repo from "../components/Repo";
import List from "../components/List";
import zip from "lodash/zip";
import { cn } from "~/lib/utils";

type Props = {
  starredByUser: unknown;
  users: Endpoints["GET /users"]["response"]["data"];
  repos: Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"][];
  loadUser: () => void;
  loadStarred: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
const UserPage: FunctionComponent<Props> = ({
  starredByUser,
  users,
  repos,
  loadUser,
  loadStarred,
}) => {
  const params = useParams();

  const login = params?.login?.toLowerCase();

  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map((id) => repos[id]);
  const starredRepoOwners = starredRepos.map((repo) => users[repo.owner]);

  const user = users[login];

  useEffect(() => {
    loadUser(login, ["name"]);
    loadStarred(login);
  }, [login, loadUser, loadStarred]);

  const handleLoadMoreClick = () => {
    loadStarred(login, true);
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

const mapStateToProps = (state) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.

  const {
    pagination: { starredByUser },
    entities: { users, repos },
  } = state;

  return {
    starredByUser,
    users,
    repos,
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, {
  loadUser: loadUserAction,
  loadStarred: loadStarredAction,
})(UserPage);
