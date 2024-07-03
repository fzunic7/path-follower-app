import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PathFollowerComponent from "../PathFollowerComponent";
// eslint-disable-next-line no-unused-vars
import { VALID_MAPS, INVALID_MAPS } from "../constants";
import { followPath } from "../../utils/pathFollower";

describe("PathFollowerComponent", () => {
  it("follows the path correctly for the basic example", () => {
    const { map, expectedLetters, expectedPath } = VALID_MAPS.BASIC_EXAMPLE;
    const result = followPath(map);
    expect(result.collectedLetters).toBe(expectedLetters);
    expect(result.path).toBe(expectedPath);
  });

  it("follows the path correctly and check for collected letters", async () => {
    render(<PathFollowerComponent />);

    userEvent.click(screen.getByText("Follow Path"));

    await waitFor(() => {
      expect(screen.getByText(/Collected Letters:/)).toBeInTheDocument();
    })
  });

  it("follows the path correctly and check for path output", async () => {
    render(<PathFollowerComponent />);

    userEvent.click(screen.getByText("Follow Path"));

    await waitFor(() => {
      expect(screen.getByText(/Path:/)).toBeInTheDocument();
    })
  });
});
