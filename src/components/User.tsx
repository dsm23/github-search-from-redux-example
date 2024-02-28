import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import type { Endpoints } from "@octokit/types";
import type { KeysToCamelCase } from "~/types";

type Props = {
  user: KeysToCamelCase<Endpoints["GET /users/{username}"]["response"]["data"]>;
};

const User: FunctionComponent<Props> = ({ user }) => {
  const { login, avatarUrl, name } = user;

  return (
    <div className="User">
      <Link to={`/${login}`}>
        <img src={avatarUrl} alt={login} width="72" height="72" />
        <h3>
          {login} {name && <span>({name})</span>}
        </h3>
      </Link>
    </div>
  );
};

export default User;
