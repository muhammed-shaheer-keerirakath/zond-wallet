import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NativeToken from "../NativeToken";

describe("NativeToken", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <NativeToken />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the native token component", () => {
    renderComponent();

    expect(screen.getByText("0 QRL")).toBeInTheDocument();
    expect(screen.getByText("Quanta")).toBeInTheDocument();
    const sendButton = screen.getByRole("button", { name: "QRL" });
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toBeEnabled();
  });
});