import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PathFollowerComponent from "../PathFollowerComponent";

describe("PathFollowerComponent", () => {
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
