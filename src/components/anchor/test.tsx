import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
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
