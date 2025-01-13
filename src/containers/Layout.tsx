import type { FunctionComponent, MouseEventHandler } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import Explore from "~/components/Explore";
import {
  errorMessageSelector,
  resetErrorMessage,
} from "~/features/error-message/slice";

const App: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(errorMessageSelector);

  const inputValue = location.pathname.substring(1);

  const handleDismissClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(resetErrorMessage());
    e.preventDefault();
  };

  const handleChange = (nextValue: string) => {
    navigate(`/${nextValue}`);
  };

  const renderErrorMessage = () => {
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: "#e99", padding: 10 }}>
        <b>{errorMessage.toString()}</b>{" "}
        <button onClick={handleDismissClick}>Dismiss</button>
      </p>
    );
  };

  return (
    <div>
      <h1 className="sr-only">Real world example</h1>
      <Explore value={inputValue} onChange={handleChange} />
      <hr />
      {renderErrorMessage()}
      <Outlet />
    </div>
  );
};

export default App;
