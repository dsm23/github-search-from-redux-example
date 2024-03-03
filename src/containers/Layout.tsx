// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Explore from "../components/Explore";
import { resetErrorMessage } from "../actions";

type Props = {
  errorMessage?: string;
  resetErrorMessage: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
const App: FunctionComponent<Props> = ({
  errorMessage,

  resetErrorMessage,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const inputValue = location.pathname.substring(1);

  const handleDismissClick = (e) => {
    resetErrorMessage();
    e.preventDefault();
  };

  const handleChange = (nextValue) => {
    navigate(`/${nextValue}`);
  };

  const renderErrorMessage = () => {
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: "#e99", padding: 10 }}>
        <b>{errorMessage}</b>{" "}
        <button onClick={handleDismissClick}>Dismiss</button>
      </p>
    );
  };

  return (
    <div>
      <Explore value={inputValue} onChange={handleChange} />
      <hr />
      {renderErrorMessage()}
      <Outlet />
    </div>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: state.errorMessage,
});

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, {
  resetErrorMessage,
})(App);
