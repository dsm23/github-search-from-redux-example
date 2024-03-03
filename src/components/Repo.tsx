import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import type { Endpoints } from "@octokit/types";
import { linkVariants } from "./anchor";

type Props = {
  owner: Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]["owner"];
  repo: Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
};

const Repo: FunctionComponent<Props> = ({ repo, owner }) => {
  const { login } = owner;
  const { name, description } = repo;

  return (
    <div className="Repo">
      <h3>
        <Link to={`/${login}/${name}`} className={linkVariants()}>
          {name}
        </Link>
        {" by "}
        <Link to={`/${login}`} className={linkVariants()}>
          {login}
        </Link>
      </h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Repo;
