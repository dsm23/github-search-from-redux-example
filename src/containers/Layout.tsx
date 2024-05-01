// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { FunctionComponent } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Explore from "../components/Explore";
import { resetErrorMessage } from "../actions";
import { useAppDispatch, useAppSelector } from "~/app/hooks";

const App: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.errorMessage);

  const inputValue = location.pathname.substring(1);

  const handleDismissClick = (e) => {
    dispatch(resetErrorMessage());
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

export default App;
