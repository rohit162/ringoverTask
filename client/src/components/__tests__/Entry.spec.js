import React from "react";
import { render, screen, act } from "@testing-library/react";
import Entry from "../Entry";

global.fetch = jest.fn().mockResolvedValue({
  json: () => [
    {
      header: "test header",
      subheader: "test subheader",
      category: "test category",
      content: "test content",
    },
  ],
});

describe("Testing Entry", () => {
  it("loads the entry and shows the data on screen", async () => {
    const match = {
      params: {
        id: 1,
      },
    };
    await act(async () => {
      render(<Entry match={match} />);
    });

    expect(screen.getByText("test header")).toBeInTheDocument();
    expect(screen.getByText("test subheader")).toBeInTheDocument();
  });
});
