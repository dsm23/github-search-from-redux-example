/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect } from "react";
import type { FunctionComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import type { Endpoints } from "@octokit/types";
import {
  loadUser as loadUserAction,
  loadStarred as loadStarredAction,
} from "../actions";
import User from "../components/User";
import Repo from "../components/Repo";
import List from "../components/List";
import zip from "lodash/zip";

type Props = {
  login: string;
  user?: Endpoints["GET /users/{username}"]["response"]["data"];
  starredPagination?: Endpoints["GET /users/{username}/starred"]["response"]["data"];
  starredRepos: Endpoints["GET /users/{username}/starred"]["response"]["data"];
  starredRepoOwners: unknown[];
  loadUser: () => void;
  loadStarred: () => void;
};

const UserPage: FunctionComponent<Props> = ({
  login,
  user,
  starredPagination,
  starredRepos,
  starredRepoOwners,
  loadUser,
  loadStarred,
}) => {
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

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.match.params.login.toLowerCase();

  const {
    pagination: { starredByUser },
    entities: { users, repos },
  } = state;

  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map((id) => repos[id]);
  const starredRepoOwners = starredRepos.map((repo) => users[repo.owner]);

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login],
  };
};

export default withRouter(
  connect(mapStateToProps, {
    loadUser: loadUserAction,
    loadStarred: loadStarredAction,
  })(UserPage),
);
