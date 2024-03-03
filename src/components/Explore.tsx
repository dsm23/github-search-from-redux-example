import { useId, useState } from "react";
import type { ChangeEventHandler, FunctionComponent } from "react";
import Anchor from "./anchor";
import Button from "./button";
import { Label } from "./Label";
import { Input } from "./Input";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

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
    <div className="space-y-3">
      <search>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor={id} className="block">
            Type a repo full name or username
          </Label>
          <Input id={id} size={45} value={value} onChange={handleChange} />
          <Button type="submit">Search</Button>
        </form>
      </search>
      <p>
        Code on{" "}
        <Anchor
          href="https://github.com/dsm23/github-search-from-redux-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </Anchor>
        .
      </p>

      <p>
        Cloned from{" "}
        <Anchor
          href="https://github.com/reduxjs/redux/tree/master/examples/real-world"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux GitHub example
        </Anchor>
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
