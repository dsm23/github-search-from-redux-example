/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect } from "react";
import type { FunctionComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import type { Endpoints } from "@octokit/types";
import {
  loadRepo as loadRepoAction,
  loadStargazers as loadStargazersAction,
} from "../actions";
import Repo from "../components/Repo";
import User from "../components/User";
import List from "../components/List";

type Props = {
  repo?: Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
  fullName: string;
  name: string;
  owner?: Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]["owner"];
  stargazers: Endpoints["GET /repos/{owner}/{repo}/stargazers"]["response"]["data"];
  stargazersPagination?: unknown;
  loadRepo: () => void;
  loadStargazers: () => void;
};

const RepoPage: FunctionComponent<Props> = ({
  repo,
  fullName,
  name,
  owner,
  stargazers,
  stargazersPagination,
  loadRepo,
  loadStargazers,
}) => {
  useEffect(() => {
    loadRepo(fullName, ["description"]);
    loadStargazers(fullName);
  }, [fullName, loadRepo, loadStargazers]);

  const handleLoadMoreClick = () => {
    loadStargazers(fullName, true);
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

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.match.params.login.toLowerCase();
  const name = ownProps.match.params.name.toLowerCase();

  const {
    pagination: { stargazersByRepo },
    entities: { users, repos },
  } = state;

  const fullName = `${login}/${name}`;
  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] };
  const stargazers = stargazersPagination.ids.map((id) => users[id]);

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login],
  };
};

export default withRouter(
  connect(mapStateToProps, {
    loadRepo: loadRepoAction,
    loadStargazers: loadStargazersAction,
  })(RepoPage),
);
