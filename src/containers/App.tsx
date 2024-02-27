/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { FunctionComponent, ReactNode } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Explore from "../components/Explore";
import { resetErrorMessage } from "../actions";

type Props = {
  errorMessage?: string;
  resetErrorMessage: () => void;
  // TODO: replace with useHistory hook
  history: unknown;
  inputValue: string;
  children: ReactNode;
};

const App: FunctionComponent<Props> = ({
  children,
  errorMessage,
  history,
  inputValue,
  resetErrorMessage,
}) => {
  const handleDismissClick = (e) => {
    resetErrorMessage();
    e.preventDefault();
  };

  const handleChange = (nextValue) => {
    history.push(`/${nextValue}`);
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
      {children}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1),
});

export default withRouter(
  connect(mapStateToProps, {
    resetErrorMessage,
  })(App),
);
