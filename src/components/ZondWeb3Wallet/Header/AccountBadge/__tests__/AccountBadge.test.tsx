import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccountBadge from "../AccountBadge";

describe("AccountBadge", () => {
  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <AccountBadge />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the account address in the shortened form with ellipses in between", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "Z20fB08fF1f1376A14C055E9F56df80563E16722b",
          },
        },
      }),
    );

    expect(screen.getByText("Z20fB0...6722b")).toBeInTheDocument();
  });
});
