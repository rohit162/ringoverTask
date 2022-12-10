import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Footer from "../Footer.js";

describe("Footer", () => {
  it("display the footer and Github link correctly", async () => {
    render(<Footer />);

    expect(screen.getByAltText("GitHub").closest("a")).toHaveAttribute(
      "href",
      "https://github.com/alochaus"
    );
  });

  it("display the footer and Mail link correctly", async () => {
    render(<Footer />);

    expect(screen.getByAltText("Envelope").closest("a")).toHaveAttribute(
      "href",
      "mailto:aloc@techie.com"
    );
  });
});
