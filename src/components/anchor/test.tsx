import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "~/test-utils/render";
import Anchor from ".";

describe("component", () => {
  describe("Anchor", () => {
    it("should render correctly", () => {
      render(<Anchor href="#">Hello, World!</Anchor>);

      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("should render correctly, asChild", () => {
      render(
        <Anchor asChild>
          <button>Hello, World!</button>
        </Anchor>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});
