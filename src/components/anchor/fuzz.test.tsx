import { describe, expect } from "vitest";
import crypto from "node:crypto";
import { fc, it } from "@fast-check/vitest";
import { render, screen } from "@testing-library/react";
import Anchor from ".";

describe("component", () => {
  describe("Anchor", () => {
    it("should render correctly with various children", () => {
      fc.assert(
        fc.property(fc.string(), (linkText) => {
          const id = crypto.randomUUID();

          render(<Anchor data-testid={id}>{linkText}</Anchor>);

          expect(screen.getByTestId(id)).toBeInTheDocument();
          expect(screen.getByTestId(id)).toHaveTextContent(linkText, {
            normalizeWhitespace: false,
          });
        }),
      );
    });

    it("should render correctly, asChild, with various children", () => {
      fc.assert(
        fc.property(fc.string(), fc.webUrl(), (linkText, href) => {
          const id = crypto.randomUUID();

          render(
            <Anchor href="#" asChild>
              <button data-testid={id}>{linkText}</button>
            </Anchor>,
          );

          expect(screen.getByTestId(id)).toBeInTheDocument();
          expect(screen.getByTestId(id)).toHaveTextContent(linkText, {
            normalizeWhitespace: false,
          });
          expect(screen.getByTestId(id)).not.toHaveAttribute(
            "href",
            href.trim(),
          );
        }),
      );
    });

    it("should handle various className values", () => {
      fc.assert(
        fc.property(fc.string(), (className) => {
          const id = crypto.randomUUID();

          render(
            <Anchor className={className} data-testid={id}>
              Test
            </Anchor>,
          );

          expect(screen.getByTestId(id)).toBeInTheDocument();

          // otherwise, default className is applied, outside the scope of fuzzing
          if (className.trim() !== "") {
            expect(screen.getByTestId(id)).toHaveClass(className);
          }
        }),
      );
    });

    it("should handle various anchor types", () => {
      fc.assert(
        fc.property(fc.constantFrom("submit", "anchor", "reset"), (type) => {
          const id = crypto.randomUUID();

          render(
            <Anchor type={type} data-testid={id}>
              Test
            </Anchor>,
          );

          expect(screen.getByTestId(id)).toHaveAttribute("type", type);
        }),
      );
    });
  });
});
