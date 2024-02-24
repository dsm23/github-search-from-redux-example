import { useId, useState } from "react";
import type { ChangeEventHandler, FunctionComponent } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const GITHUB_REPO = "https://github.com/reduxjs/redux";

const Explore: FunctionComponent<Props> = ({ value: prevValue, onChange }) => {
  const [value, setValue] = useState(prevValue);
  const id = useId();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = () => {
    onChange(value);
  };

  return (
    <div>
      <search>
        <form onSubmit={handleSubmit}>
          <label htmlFor={id}>Type a repo full name or username</label>
          <input id={id} size={45} value={value} onChange={handleChange} />
          <button type="submit">Go!</button>
        </form>
      </search>
      <p>
        Code on{" "}
        <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
          Github
        </a>
        .
      </p>
      <p>
        Move the DevTools with <kbd>Ctrl</kbd> + <kbd>W</kbd> or hide them with{" "}
        <kbd>Ctrl</kbd> + <kbd>H</kbd>.
      </p>
    </div>
  );
};

export default Explore;
